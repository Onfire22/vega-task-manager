import { prismaAppClient } from '../../lib/prisma';
import { ICompanyCreate } from './companies.types';

const createCompany = (companyData: ICompanyCreate) => {
	return prismaAppClient.company.create({
		data: companyData,
	});
};

export const companiesService = { createCompany };
