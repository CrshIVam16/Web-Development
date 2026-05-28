import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import Alert from "../components/Alert";

function Card({ title, children }) {
  return (
    <div className="card p-4">
      <div className="font-semibold">{title}</div>
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {children}
      </div>
    </div>
  );
}

function FAQ({ q, a }) {
  return (
    <div className="card p-4">
      <div className="font-semibold">{q}</div>
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{a}</div>
    </div>
  );
}

function Preview() {
  return (
    <div className="card p-5">
      <div className="text-sm font-semibold">Portal Preview</div>
      <div className="mt-3 grid gap-3">
        <div className="card-muted p-4">
          <div className="text-sm font-semibold">Materials</div>
          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Organized by subject & semester
          </div>
          <div className="mt-3 h-2 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mt-2 h-2 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mt-2 h-2 w-4/6 rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="card-muted p-4">
          <div className="text-sm font-semibold">Notices</div>
          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Important updates in one place
          </div>
          <div className="mt-3 h-2 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mt-2 h-2 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="card-muted p-4">
          <div className="text-sm font-semibold">Opportunities</div>
          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Alumni submissions verified by admin
          </div>
          <div className="mt-3 h-2 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mt-2 h-2 w-4/6 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-stone-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50">
      <PublicNavbar />

      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* Small top info banner (real-site feel) */}
        {/* <div className="mb-6">
          <Alert variant="info">
            UniHub is a single-college student project demo. Admin accounts are created separately.
          </Alert>
        </div> */}

        {/* HERO */}
        <section className="grid gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              A centralized, role-based college portal for academic resources and verified updates.
            </h1>

            <p className="mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400 sm:text-base">
              UniHub brings study materials, notices, and alumni opportunities into one clean platform.
              Teachers publish resources, alumni contribute opportunities, and admins verify content before
              students view it.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Get started
              </Link>

              {/* Added: register CTA (common on real websites) */}
              <Link
                to="/register"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
              >
                Create account
              </Link>

              <a
                href="#features"
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
              >
                See features
              </a>
            </div>

            {/* Added: quick stats row (real-site feel, still simple) */}
            {/* <div className="mt-6 grid max-w-xl grid-cols-3 gap-3 text-center">
              <div className="card-muted p-3">
                <div className="text-sm font-semibold">RBAC</div>
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Role-based access
                </div>
              </div>
              <div className="card-muted p-3">
                <div className="text-sm font-semibold">JWT</div>
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Secure sessions
                </div>
              </div>
              <div className="card-muted p-3">
                <div className="text-sm font-semibold">Approval</div>
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Verified posts
                </div>
              </div>
            </div> */}

            <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
              Built with MERN, JWT authentication, and an approval workflow for alumni submissions.
            </div>
          </div>

          <Preview />
        </section>

        {/* FEATURES */}
        <section id="features" className="mt-10 scroll-mt-24">
          <h2 className="text-xl font-semibold">Features</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Designed to be minimal, searchable, and reliable for daily college usage.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card title="Materials + Search">
              Teachers upload PDFs/images; students search by keyword, subject, and semester.
            </Card>
            <Card title="Notices">
              Teachers post notices that students can quickly view and search.
            </Card>
            <Card title="Verified Opportunities">
              Alumni submissions go through admin approval (pending → approved/rejected).
            </Card>
            <Card title="Role-Based Access (RBAC)">
              Students/Teachers/Alumni/Admin have different dashboards and permissions.
            </Card>
            <Card title="Light/Dark Mode">
              A clean UI that works well in both light and dark theme.
            </Card>
            <Card title="File Upload Support">
              PDF/images are stored securely on the server; metadata is stored in MongoDB.
            </Card>
          </div>
        </section>

        {/* ROLES */}
        <section id="roles" className="mt-10 scroll-mt-24">
          <h2 className="text-xl font-semibold">For roles</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            UniHub is designed around real college roles and workflows.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card title="Students">
              Find materials fast, stay updated with notices, and browse only approved opportunities.
            </Card>
            <Card title="Teachers">
              Upload materials and publish notices without unnecessary complexity.
            </Card>
            <Card title="Alumni">
              Share opportunities and provide useful links; students can connect via social profiles.
            </Card>
            <Card title="Admin">
              Maintain authenticity through approvals and keep the portal trusted.
            </Card>
          </div>
        </section>

        {/* VERIFICATION */}
        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-semibold">Verification & Authenticity</h2>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
            Opportunities submitted by alumni are not shown to students directly. They are first stored as
            <span className="font-medium"> pending</span> and reviewed by Admin. Only
            <span className="font-medium"> approved</span> items are visible to students. This ensures the platform
            remains reliable and reduces spam or irrelevant posts.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-10 scroll-mt-24">
          <h2 className="text-xl font-semibold">FAQ</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <FAQ
              q="Who can upload study materials?"
              a="Only teachers can upload study materials. Students can view and download them after login."
            />
            <FAQ
              q="How are opportunities verified?"
              a="Alumni submissions go to admin as pending. Admin approves or rejects them before students can view."
            />
            <FAQ
              q="Can students post opportunities?"
              a="No. Students can only view approved opportunities. Posting is limited to alumni."
            />
            <FAQ
              q="How can students connect with alumni?"
              a="Alumni can add LinkedIn/GitHub/Instagram links in their profile, which are shown with their posts."
            />
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <h2 className="text-xl font-semibold">About</h2>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
            UniHub is a single-college portal developed as a student project. It focuses on organization,
            verified information, and a clean user experience suitable for mobile and desktop usage.
            <br />
            It is built keeping in mind the real needs of students, teachers, alumni, and admins in a college
            environment. The project is not intended for commercial use but serves as a practical demonstration
            of full-stack development skills and understanding of user roles and workflows in an educational
            context.
          </p>
        </section>

        <footer className="mt-10 pb-6 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} UniHub • Student Project
        </footer>
      </main>
    </div>
  );
}