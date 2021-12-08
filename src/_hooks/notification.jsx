import useSWR from 'swr'
import axios from 'axios'
import { useState } from 'react'

import produce from 'immer'
import { useRouter } from 'next/router'
import fetcher from '@/_services/fetcher'

export default function useNotification(user) {
  const profile = user ? user.Profile : null
  const url = profile ? `/api/notification/${user.Profile.id}` : null
  const { data, error, mutate } = useSWR(url, fetcher, {
    shouldRetryOnError: false,
    refreshInterval: 1000
  })

  const setInvitationStatusToAccepted = (inviOwnerProfileId, invitationId) => (new Promise((resolve, reject) => {
    axios({
      method: 'PUT',
      url: `/api/invitation/invitationUpdate/${inviOwnerProfileId}/${invitationId}`,
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      mutate(produce(data, (draft) => {
        const index = draft.invitation1.findIndex((item) => item.id === invitationId)
        if (index !== -1) draft.invitation1.splice(index, 1)
      }))
    }).catch((err) => {
      reject(err)
    })
  }))

  const rejectInvitation = (invitationId) => (new Promise((resolve, reject) => {
    axios({
      method: 'DELETE',
      url: `/api/invitation/rejectInvitation/${invitationId}`,
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      mutate(produce(data, (draft) => {
        const index = draft.invitation1.findIndex((item) => item.id === invitationId)
        if (index !== -1) draft.invitation1.splice(index, 1)
      }))
    }).catch((err) => {
      reject(err)
    })
  }))

  const setInvitationResult = (result, profileId, invitationId) => (new Promise((resolve, reject) => {
    axios({
      method: 'PUT',
      url: `/api/invitation/invitationUpdate/${profileId}/updateResult/${invitationId}`,
      data: result,
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      mutate(data, (draft) => {
        const index = draft.invitation1.findIndex((item) => item.id === invitationId)
        if (index !== -1) draft.invitation1.splice(index, 1)
      })
    }).catch((err) => {
      reject(err)
    })
  }))

  return {
    notifications: data,
    isLoading: !error && !data,
    isError: error,
    setInvitationStatusToAccepted,
    rejectInvitation,
    setInvitationResult
  }
}
