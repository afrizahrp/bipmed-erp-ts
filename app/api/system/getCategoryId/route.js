const { prisma } = require('@/lib/client');

async function getCategoryId(companyId, branchId, categoryType, userId) {
  try {
    const result =
      await prisma.$queryRaw`DECLARE @rt_doc_id VARCHAR(20); EXEC get_CategoryId ${companyId}, ${branchId},  ${categoryType},  ${userId}, @rt_doc_id OUTPUT; SELECT @rt_doc_id as doc_id;`;
    const docId = result[0].doc_id;
    return docId;
  } catch (e) {
    console.error(e);
    throw new Error('Something went wrong while trying to get document ID');
  }
}

export default getCategoryId;
// module.exports = getCategoryId;
