import SelectBox from '@/app/components/select/SelectBox'
import PageTop from '@/app/layout/pageTop/page'
import RoomNav from '@/app/(product)/(roomComponent)/RoomNav'

export default async function RoomLayout(props) {
    return (
        <div className="content">
            <PageTop />
            {/* <RoomNav props={roomCata} params={params} /> */}
            {props.children}
        </div>
    )
}
