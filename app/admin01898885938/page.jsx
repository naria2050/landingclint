import AdminLayout from '../components/admin/AdminLayout'
import BookingList from '../components/admin/BookingList'
import BreakingNewsList from '../components/admin/BreakingNewsList'
import VideoLinkList from '../components/admin/VideoLinkList'
import CardList from '../components/admin/CardList'

export default function AdminPage() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <div className="space-y-8">
        <BookingList />
        <BreakingNewsList />
        <VideoLinkList />
        <CardList />
      </div>
    </AdminLayout>
  )
}

