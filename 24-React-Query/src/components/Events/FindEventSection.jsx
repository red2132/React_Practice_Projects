import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { fetchEvents } from '../../util/http';
import LoadingIndicator from '../UI/LoadingIndicator';
import EventItem from './EventItem';

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState()

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['events', { searchTerm: searchTerm }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    enabled: searchTerm !== undefined // 검색어를 입력했을 때만 활성화
  })

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value)
  }
  let content = <p>검색어를 입력해 주세요.</p>

  if(isLoading) {
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
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
