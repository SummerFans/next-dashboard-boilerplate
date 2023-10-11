import { getDictionary } from "@/get-dictionary"

export default async function ProfilePage({
    params: { lang },
}: {
    params: { lang: Lang },
}) {

    const dictionary = (await getDictionary(lang))['server-page'].profile

    return (
        <div className='px-8 py-4'>
            <h1 className='pb-8'>{dictionary.title_txt}</h1>
        </div>
    )
}