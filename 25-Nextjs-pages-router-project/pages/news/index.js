import Link from "next/link"

function NewsPage() {
    return (
    <>
    <h1>뉴스 페이지</h1>
    <ul>
        <li><Link to='nextJs'>NextJS 배우기</Link></li>
        <li><Link to='something'>어쩌구 저쩌구</Link></li>
    </ul>
    </>
    )
}

export default NewsPage