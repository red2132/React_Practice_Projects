import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient()

export async function fetchEvents({ signal, searchTerm, max }) {
  let url = 'http://localhost:3000/events'

  if (searchTerm && max) {
    url += '?search=' + searchTerm + '&max=' + max
  } else if (searchTerm) {
    url += '?search=' + searchTerm
  } else if (max) {
    url += '?max=' + max
  }

  const response = await fetch(url, { signal: signal })

  if (!response.ok) {
    const error = new Error('데이터를 받아오는 중에 문제가 발생했습니다')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { events } = await response.json()

  return events
}


export async function createNewEvent(eventData) {
  const response = await fetch(`http://localhost:3000/events`, {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('저장 중에 문제가 발생했습니다')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { event } = await response.json()

  return event
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch(`http://localhost:3000/events/images`, { signal })

  if (!response.ok) {
    const error = new Error('사진 업로드 중에 문제가 발생했습니다')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { images } = await response.json()

  return images
}

export async function fetchEvent({ id, signal }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, { signal })

  if (!response.ok) {
    const error = new Error('데이터를 받아오는 중에 문제가 발생했습니다')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { event } = await response.json()

  return event
}


export async function deleteEvent({ id }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const error = new Error('데이터를 삭제하는 중에 문제가 발생했습니다')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  return response.json()
}

export async function updateEvent({ id, event }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ event }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = new Error('게시물 업데이트 중에 문제가 발생했습니다')
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  return response.json();
}