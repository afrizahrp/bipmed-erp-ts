import { prisma } from '@/lib/client';

interface QueryResult {
  doc_id: string;
}

async function getMaterialId(
  companyId: string,
  branchId: string,
  prefixId: string,
  userId: string
): Promise<string> {
  try {
    const result: QueryResult[] =
      await prisma.$queryRaw`DECLARE @rt_doc_id VARCHAR(20); EXEC get_ProductId ${companyId}, ${branchId},  ${prefixId},  ${userId}, @rt_doc_id OUTPUT; SELECT @rt_doc_id as doc_id;`;
    const docId = result[0].doc_id;
    console.log('new material id is:', docId);
    return docId;
  } catch (e) {
    console.error(e);

    throw new Error('Something went wrong while trying to get document ID');
  }
}

export default getMaterialId;
