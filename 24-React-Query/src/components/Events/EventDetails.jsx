import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import Header from '../Header.jsx';
import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false)

  const id = useParams().id
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ id: id, signal })
  })

  //삭제 이벤트
  const { 
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError, 
  } = useMutation({
    mutationFn: deleteEvent,
    // 성공시 이벤트
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none' // query 자동 트리거 방지(삭제한 페이지 리로드 안 함)
      })
      navigate('/events') // 화면 이동
    }
  })

  function handleStartDelete() {
    setIsDeleting(true)
  }
  
  function handleStopDelete() {
    setIsDeleting(false)
  }

  function handleDelete() {
    mutate({ id: id })
  }

  let content;

  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>데이터를 불러오고 있습니다...</p>
      </div>
    )
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            '데이터를 불러오는 중에 문제가 발생했습니다'
          }
        />
      </div>
    )
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>삭제</button>
            <Link to="edit">수정</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      {isDeleting && (
          <Modal onClose={handleStopDelete}>
            <h2>정말 삭제하시겠습니까?</h2>
            <p>다시 복구할 수 없습니다</p>
            <div className="form-actions">
            {isPendingDeletion && <p>삭제 중...</p>}
            {!isPendingDeletion && (
              <>
                <button onClick={handleStopDelete} className="button-text">
                  취소
                </button>
                <button onClick={handleDelete} className="button">
                  삭제
                </button>
              </>
            )}
            </div>
            {isErrorDeleting && (
              <ErrorBlock
                title="Failed to delete event"
                message={
                  deleteError.info?.message ||
                  '게시물을 삭제하지 못했습니다'
                }
              />
            )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}