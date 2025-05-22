import AmusementList from './AmusementList'

export default function UserAmusementContainer() {
    return (
        <section className="flex flex-col gap-4 bg-white shadow-md rounded-lg px-8 p-4">
            <h1 className="text-2xl font-bold mb-4">Your amusements</h1>
            <AmusementList />
        </section>
    )
}
