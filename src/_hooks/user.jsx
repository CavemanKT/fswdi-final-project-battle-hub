import useSWR from 'swr'

import fetcher from '@/_services/fetcher'

export default function useUser() {
  const { data, error, mutate } = useSWR('/api/my/profile', fetcher)

  return {
    user: data?.user || null,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    mutate
  }
}
