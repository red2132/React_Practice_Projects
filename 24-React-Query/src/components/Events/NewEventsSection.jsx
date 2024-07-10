import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
   queryKey: ['events', { max:3 }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }), // http 요청 전송 로직
    staleTime: 5000, // 캐시 유통기간
    // gcTime 캐시 저장기간 관리 
  })

  let content

  if (isPending) {
    content = <LoadingIndicator />
  }

  if (isError) {
    content = (
      <ErrorBlock 
        title="문제 발생"
        message={ error.info?.message || '데이터를 불러오지 못했습니다' }
      />
    )
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
