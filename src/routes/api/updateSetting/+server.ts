import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {

    const {id, value} = await request.json();

    console.log(id, value)

    try {

        const item = await prisma.setting.findFirst({
            where: {
                id: id
            }
        })

        if (!item) {
            console.error('Item not found');
            return json({});
        }

        await prisma.setting.update(
            {
                where: {
                    id: id,
                },
                data: {
                    title: item.title,
                    value: value
                }
            }
        )

        item.value = value;

        return json(item)
        
    } catch (err) {
        console.error(err)
    };
}