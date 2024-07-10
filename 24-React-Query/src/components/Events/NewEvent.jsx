import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query';
import { createNewEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    // 성공시 action
    onSuccess: () => {
       // 쿼리 무효화 & 데이터 리로드
      queryClient.invalidateQueries({queryKey: ['events']})
      navigate('/events')
    }
  })

  function handleSubmit(formData) {
    mutate({ event: formData }) // 전송 시기 지정
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && '저장 중...'}
        {!isPending && (
        <>
          <Link to="../" className="button-text">
            취소
          </Link>
          <button type="submit" className="button">
            저장
          </button>
        </>
        )}
      </EventForm>
      {isError && 
        <ErrorBlock 
          title="문제 발생"
          message={ error.info?.message || '데이터를 저장하지 못했습니다' }
        />
      }
    </Modal>
  );
}
