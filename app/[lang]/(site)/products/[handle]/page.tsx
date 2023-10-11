import { getDictionary } from "@/get-dictionary";

export default async function ProductItemPage({
    params: { lang, handle },
}: {
    params: { lang: Lang, handle: string },
}) {

    const dictionary = (await getDictionary(lang))['server-page'].product_item

    return (
        <div className='px-8 py-4'>
            <h1 className='pb-8'>{dictionary.title_txt}</h1>
        </div>
    )
}