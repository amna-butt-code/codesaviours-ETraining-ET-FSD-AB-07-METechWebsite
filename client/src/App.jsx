import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import EVCharging from './pages/EVCharging.jsx';
import Training from './pages/Training.jsx';
import TrainingDetail from './pages/TrainingDetail.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Contact from './pages/Contact.jsx';
import Quote from './pages/Quote.jsx';
import Legal from './pages/Legal.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Leads from './pages/admin/Leads.jsx';
import Enrollments from './pages/admin/Enrollments.jsx';
import { AdminServices, AdminCourses, AdminBatches, AdminProjects, AdminPosts } from './pages/admin/ResourcePages.jsx';
function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/ev-charging" element={<EVCharging />} />
        <Route path="/training" element={<Training />} />
        <Route path="/training/:slug" element={<TrainingDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />
        <Route
          path="/privacy"
          element={
            <Legal title="Privacy Policy">
              <p>We collect the details you submit in our forms, such as name, phone, email and message, only to respond to your request.</p>
              <p>We do not sell your information. You can ask us to delete your details at any time through the contact page.</p>
            </Legal>
          }
        />
        <Route
          path="/terms"
          element={
            <Legal title="Terms">
              <p>The information on this website is for general guidance. Quotes and designs are confirmed only in writing after a site survey.</p>
              <p>Training fees, dates and seats can change. Enrollment is confirmed by our team.</p>
            </Legal>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
      <Route path="leads" element={<Leads />} />
<Route path="enrollments" element={<Enrollments />} />
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="services" element={<AdminServices />} />
<Route path="courses" element={<AdminCourses />} />
<Route path="batches" element={<AdminBatches />} />
<Route path="projects" element={<AdminProjects />} />
<Route path="posts" element={<AdminPosts />} />
    </Routes>
  );
}