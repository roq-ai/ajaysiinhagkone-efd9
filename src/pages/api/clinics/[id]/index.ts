import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { clinicValidationSchema } from 'validationSchema/clinics';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.clinic
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getClinicById();
    case 'PUT':
      return updateClinicById();
    case 'DELETE':
      return deleteClinicById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getClinicById() {
    const data = await prisma.clinic.findFirst(convertQueryToPrismaUtil(req.query, 'clinic'));
    return res.status(200).json(data);
  }

  async function updateClinicById() {
    await clinicValidationSchema.validate(req.body);
    const data = await prisma.clinic.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    if (req.body.name) {
      await roqClient.asUser(roqUserId).updateTenant({ id: user.tenantId, tenant: { name: req.body.name } });
    }
    return res.status(200).json(data);
  }
  async function deleteClinicById() {
    const data = await prisma.clinic.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
