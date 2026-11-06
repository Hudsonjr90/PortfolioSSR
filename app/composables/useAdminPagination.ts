import { computed, ref, watch, type Ref } from 'vue'

export function useAdminPagination<T>(records: Ref<T[]>, pageSize = 5) {
  const currentPage = ref(1)
  const totalPages = computed(() => Math.ceil(records.value.length / pageSize))
  const paginatedRecords = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return records.value.slice(start, start + pageSize)
  })

  watch(totalPages, (pages) => {
    if (currentPage.value > pages) currentPage.value = Math.max(1, pages)
  })

  return { currentPage, totalPages, paginatedRecords }
}
