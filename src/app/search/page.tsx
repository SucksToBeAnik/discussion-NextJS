import { redirect } from "next/navigation"
import PostList from "@/components/posts/post-list"
import { fetchPostsBySearchTerm } from "@/db/queries/posts"


interface SearchPageProps {
    searchParams:{
        term:string
    }
}

const SearchPage = ({searchParams}:SearchPageProps)=> {
    const {term} = searchParams
    if(!term) redirect('/')

    return (
        <div>
            <h1 className="text-2xl font-semibold my-6">Search results for <span className="font-bold text-blue-400">{term}</span></h1>
            <PostList fetchData={()=>fetchPostsBySearchTerm(term)} />
        </div>
    )
}



export default SearchPage;
