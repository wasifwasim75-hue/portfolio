import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import {
  statsAPI,
  projectsAPI,
  contactAPI,
  skillsAPI,
  experiencesAPI,
  educationAPI,
  profileAPI,
} from '../../services/api';
import {
  DashboardStats,
  Project,
  ContactMessage,
  Skill,
  Experience,
  Education,
  Profile,
} from '../../types';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorAlert } from '../../components/common/ErrorAlert';
import { useProfile } from '../../context/ProfileContext';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'personal' | 'hero' | 'about' | 'skills' | 'projects' | 'education' | 'experience' | 'socials' | 'resume' | 'messages'
  >('overview');

  const { refetchProfile } = useProfile();

  // Data fetching hooks
  const { data: stats, loading: statsLoading, error: statsError, refetch: refetchStats } = useFetch<DashboardStats>(() => statsAPI.getStats());
  const { data: profile, loading: profileLoading, refetch: refetchProfileData } = useFetch<Profile>(() => profileAPI.get());
  const { data: projects, loading: projLoading, refetch: refetchProjects } = useFetch<Project[]>(() => projectsAPI.getAll());
  const { data: messages, loading: msgLoading, refetch: refetchMessages } = useFetch<ContactMessage[]>(() => contactAPI.getAll());
  const { data: skills, loading: skillsLoading, refetch: refetchSkills } = useFetch<Skill[]>(() => skillsAPI.getAll());
  const { data: experiences, loading: expLoading, refetch: refetchExp } = useFetch<Experience[]>(() => experiencesAPI.getAll());
  const { data: education, loading: eduLoading, refetch: refetchEdu } = useFetch<Education[]>(() => educationAPI.getAll());

  // Notification banners
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);
  const [alertError, setAlertError] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setAlertSuccess(msg);
    setAlertError(null);
    setTimeout(() => setAlertSuccess(null), 4000);
  };

  const showError = (msg: string) => {
    setAlertError(msg);
    setAlertSuccess(null);
  };

  // 1. Profile Form State (Personal, Hero, About, Socials, Resume)
  const [profileForm, setProfileForm] = useState<Partial<Profile>>({});
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    if (profile) {
      setProfileForm(profile);
    }
  }, [profile]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await profileAPI.update(profileForm);
      await refetchProfileData();
      await refetchProfile();
      showSuccess('Profile information updated successfully!');
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const res = await profileAPI.uploadFile(file);
      setProfileForm((prev) => ({ ...prev, profilePhoto: res.url }));
      showSuccess('Photo uploaded! Click "Save Changes" to apply.');
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Photo upload failed');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingResume(true);
    try {
      const res = await profileAPI.uploadFile(file);
      setProfileForm((prev) => ({
        ...prev,
        resumeUrl: res.url,
        resumeFileName: file.name,
      }));
      showSuccess('Resume PDF uploaded! Click "Save Changes" to publish.');
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Resume upload failed');
    } finally {
      setUploadingResume(false);
    }
  };

  // 2. Project State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
  });
  const [savingProject, setSavingProject] = useState(false);
  const [uploadingProjImage, setUploadingProjImage] = useState(false);

  const startEditProject = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      description: proj.description,
      image: proj.image,
      technologies: proj.technologies.join(', '),
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      featured: proj.featured || false,
    });
  };

  const cancelEditProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      image: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      featured: false,
    });
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingProjImage(true);
    try {
      const res = await profileAPI.uploadFile(file);
      setProjectForm((prev) => ({ ...prev, image: res.url }));
      showSuccess('Project image uploaded!');
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Image upload failed');
    } finally {
      setUploadingProjImage(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProject(true);
    try {
      const payload = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      };
      if (editingProject) {
        await projectsAPI.update(editingProject._id, payload);
        showSuccess('Project updated successfully!');
      } else {
        await projectsAPI.create(payload);
        showSuccess('Project created successfully!');
      }
      cancelEditProject();
      refetchProjects();
      refetchStats();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setSavingProject(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectsAPI.delete(id);
      showSuccess('Project deleted.');
      refetchProjects();
      refetchStats();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  // 3. Skills State
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillForm, setSkillForm] = useState<{
    name: string;
    category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Other';
    proficiency: number;
    icon: string;
  }>({
    name: '',
    category: 'Frontend',
    proficiency: 85,
    icon: 'bi-code-slash',
  });
  const [savingSkill, setSavingSkill] = useState(false);

  const startEditSkill = (s: Skill) => {
    setEditingSkill(s);
    setSkillForm({
      name: s.name,
      category: s.category,
      proficiency: s.proficiency,
      icon: s.icon || 'bi-code-slash',
    });
  };

  const cancelEditSkill = () => {
    setEditingSkill(null);
    setSkillForm({
      name: '',
      category: 'Frontend',
      proficiency: 85,
      icon: 'bi-code-slash',
    });
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSkill(true);
    try {
      if (editingSkill) {
        await skillsAPI.update(editingSkill._id, skillForm);
        showSuccess('Skill updated successfully!');
      } else {
        await skillsAPI.create(skillForm);
        showSuccess('Skill added successfully!');
      }
      cancelEditSkill();
      refetchSkills();
      refetchStats();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to save skill');
    } finally {
      setSavingSkill(false);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await skillsAPI.delete(id);
      showSuccess('Skill removed.');
      refetchSkills();
      refetchStats();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  // 4. Education State
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [educationForm, setEducationForm] = useState({
    institution: '',
    degree: '',
    department: '',
    year: '',
    cgpa: '',
    description: '',
    startYear: '',
    endYear: '',
  });
  const [savingEducation, setSavingEducation] = useState(false);

  const startEditEducation = (edu: Education) => {
    setEditingEducation(edu);
    setEducationForm({
      institution: edu.institution,
      degree: edu.degree,
      department: edu.department || '',
      year: edu.year || '',
      cgpa: edu.cgpa || '',
      description: edu.description || '',
      startYear: String(edu.startYear || ''),
      endYear: String(edu.endYear || ''),
    });
  };

  const cancelEditEducation = () => {
    setEditingEducation(null);
    setEducationForm({
      institution: '',
      degree: '',
      department: '',
      year: '',
      cgpa: '',
      description: '',
      startYear: '',
      endYear: '',
    });
  };

  const handleSaveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEducation(true);
    try {
      const payload = {
        ...educationForm,
        startYear: educationForm.startYear || educationForm.year || '2020',
        endYear: educationForm.endYear || 'Present',
      };
      if (editingEducation) {
        await educationAPI.update(editingEducation._id, payload);
        showSuccess('Education updated successfully!');
      } else {
        await educationAPI.create(payload);
        showSuccess('Education record added successfully!');
      }
      cancelEditEducation();
      refetchEdu();
      refetchStats();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to save education');
    } finally {
      setSavingEducation(false);
    }
  };

  const handleDeleteEducation = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this education entry?')) return;
    try {
      await educationAPI.delete(id);
      showSuccess('Education entry removed.');
      refetchEdu();
      refetchStats();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  // 5. Experience / Internship State
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [expForm, setExpForm] = useState({
    company: '',
    position: '',
    duration: '',
    description: '',
    technologies: '',
    startDate: '',
    endDate: '',
    current: false,
    certificateUrl: '',
  });
  const [savingExp, setSavingExp] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);

  const startEditExp = (exp: Experience) => {
    setEditingExp(exp);
    setExpForm({
      company: exp.company,
      position: exp.position,
      duration: exp.duration || '',
      description: exp.description,
      technologies: exp.technologies ? exp.technologies.join(', ') : '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      current: exp.current || false,
      certificateUrl: exp.certificateUrl || '',
    });
  };

  const cancelEditExp = () => {
    setEditingExp(null);
    setExpForm({
      company: '',
      position: '',
      duration: '',
      description: '',
      technologies: '',
      startDate: '',
      endDate: '',
      current: false,
      certificateUrl: '',
    });
  };

  const handleCertUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCert(true);
    try {
      const res = await profileAPI.uploadFile(file);
      setExpForm((prev) => ({ ...prev, certificateUrl: res.url }));
      showSuccess('Certificate/Offer uploaded!');
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploadingCert(false);
    }
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingExp(true);
    try {
      const payload = {
        ...expForm,
        startDate: expForm.startDate || expForm.duration || '2022',
        technologies: expForm.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      };
      if (editingExp) {
        await experiencesAPI.update(editingExp._id, payload);
        showSuccess('Experience updated successfully!');
      } else {
        await experiencesAPI.create(payload);
        showSuccess('Experience record added successfully!');
      }
      cancelEditExp();
      refetchExp();
      refetchStats();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to save experience');
    } finally {
      setSavingExp(false);
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this experience entry?')) return;
    try {
      await experiencesAPI.delete(id);
      showSuccess('Experience record removed.');
      refetchExp();
      refetchStats();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  // 6. Messages State
  const handleMarkAsRead = async (id: string) => {
    try {
      await contactAPI.markAsRead(id);
      refetchMessages();
      refetchStats();
      showSuccess('Message status updated.');
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to update');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await contactAPI.delete(id);
      refetchMessages();
      refetchStats();
      showSuccess('Message deleted.');
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const refreshAll = () => {
    refetchStats();
    refetchProfileData();
    refetchProfile();
    refetchProjects();
    refetchMessages();
    refetchSkills();
    refetchExp();
    refetchEdu();
    showSuccess('Refreshed all data from database.');
  };

  return (
    <div className="container-fluid py-4 px-md-5">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1">
            <span className="gradient-text">Portfolio Content Management System</span>
          </h2>
          <p className="text-secondary small mb-0">
            Edit live portfolio sections, personal info, resume, skills, and projects dynamically
          </p>
        </div>
        <div className="d-flex gap-2">
          <button onClick={refreshAll} className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
            <i className="bi bi-arrow-clockwise"></i> Refresh All Data
          </button>
          <a href="/" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm d-flex align-items-center gap-1">
            <i className="bi bi-box-arrow-up-right"></i> View Live Site
          </a>
        </div>
      </div>

      {/* Global Alert messages */}
      {alertSuccess && (
        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center" role="alert">
          <i className="bi bi-check-circle-fill me-2 fs-5"></i>
          <div>{alertSuccess}</div>
          <button type="button" className="btn-close" onClick={() => setAlertSuccess(null)}></button>
        </div>
      )}

      {alertError && (
        <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
          <div>{alertError}</div>
          <button type="button" className="btn-close" onClick={() => setAlertError(null)}></button>
        </div>
      )}

      {/* Navigation Pills */}
      <div className="d-flex flex-wrap gap-2 mb-4 border-bottom border-secondary border-opacity-10 pb-3">
        <button
          className={`btn btn-sm rounded-pill px-3 ${activeTab === 'overview' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('overview')}
        >
          <i className="bi bi-speedometer2 me-1"></i> Overview
        </button>
        <button
          className={`btn btn-sm rounded-pill px-3 ${activeTab === 'personal' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('personal')}
        >
          <i className="bi bi-person-lines-fill me-1"></i> 1. Personal Info
        </button>
        <button
          className={`btn btn-sm rounded-pill px-3 ${activeTab === 'hero' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('hero')}
        >
          <i className="bi bi-window-fullscreen me-1"></i> 2. Hero Section
        </button>
        <button
          className={`btn btn-sm rounded-pill px-3 ${activeTab === 'about' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('about')}
        >
          <i className="bi bi-file-earmark-person me-1"></i> 3. About Section
        </button>
        <button
          className={`btn btn-sm rounded-pill px-3 ${activeTab === 'skills' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('skills')}
        >
          <i className="bi bi-cpu-fill me-1"></i> 4. Skills ({skills?.length || 0})
        </button>
        <button
          className={`btn btn-sm rounded-pill px-3 ${activeTab === 'projects' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('projects')}
        >
          <i className="bi bi-grid-fill me-1"></i> 5. Projects ({projects?.length || 0})
        </button>
        <button
          className={`btn btn-sm rounded-pill px-3 ${activeTab === 'education' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('education')}
        >
          <i className="bi bi-mortarboard-fill me-1"></i> 6. Education ({education?.length || 0})
        </button>
        <button
          className={`btn btn-sm rounded-pill px-3 ${activeTab === 'experience' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('experience')}
        >
          <i className="bi bi-briefcase-fill me-1"></i> 7. Experience / Internships ({experiences?.length || 0})
        </button>
        <button
          className={`btn btn-sm rounded-pill px-3 ${activeTab === 'socials' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('socials')}
        >
          <i className="bi bi-share-fill me-1"></i> 8. Social Media & Contact
        </button>
        <button
          className={`btn btn-sm rounded-pill px-3 ${activeTab === 'resume' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('resume')}
        >
          <i className="bi bi-file-earmark-pdf-fill me-1"></i> 9. Resume File
        </button>
        <button
          className={`btn btn-sm rounded-pill px-3 ${activeTab === 'messages' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('messages')}
        >
          <i className="bi bi-envelope-fill me-1"></i> Inquiries ({messages?.length || 0})
        </button>
      </div>

      {statsError && <ErrorAlert message={statsError} onRetry={refetchStats} />}

      {/* ======================================================== */}
      {/* TAB: OVERVIEW */}
      {/* ======================================================== */}
      {activeTab === 'overview' && (
        <>
          {statsLoading ? (
            <LoadingSpinner message="Calculating portfolio stats..." />
          ) : stats ? (
            <div className="row g-4 mb-4">
              <div className="col-sm-6 col-lg-3">
                <div className="modern-card p-4 h-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="text-secondary small fw-semibold">TOTAL PROJECTS</div>
                      <div className="display-6 fw-bold mt-1">{stats.projectsCount}</div>
                      <div className="small text-warning mt-1">
                        <i className="bi bi-star-fill me-1"></i> {stats.featuredProjectsCount} Featured
                      </div>
                    </div>
                    <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-3 fs-3">
                      <i className="bi bi-collection-fill"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <div className="modern-card p-4 h-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="text-secondary small fw-semibold">INQUIRIES / MSGS</div>
                      <div className="display-6 fw-bold mt-1">{stats.messagesCount}</div>
                      <div className="small text-danger mt-1">
                        <i className="bi bi-bell-fill me-1"></i> {stats.unreadMessagesCount} Unread
                      </div>
                    </div>
                    <div className="p-3 bg-danger bg-opacity-10 text-danger rounded-3 fs-3">
                      <i className="bi bi-chat-left-dots-fill"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <div className="modern-card p-4 h-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="text-secondary small fw-semibold">SKILLS REGISTERED</div>
                      <div className="display-6 fw-bold mt-1">{stats.skillsCount}</div>
                      <div className="small text-success mt-1">
                        <i className="bi bi-check-circle me-1"></i> Across All Stacks
                      </div>
                    </div>
                    <div className="p-3 bg-success bg-opacity-10 text-success rounded-3 fs-3">
                      <i className="bi bi-cpu-fill"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-3">
                <div className="modern-card p-4 h-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="text-secondary small fw-semibold">CAREER & EDUCATION</div>
                      <div className="display-6 fw-bold mt-1">
                        {stats.experiencesCount + stats.educationCount}
                      </div>
                      <div className="small text-info mt-1">
                        {stats.experiencesCount} Jobs / {stats.educationCount} Degrees
                      </div>
                    </div>
                    <div className="p-3 bg-info bg-opacity-10 text-info rounded-3 fs-3">
                      <i className="bi bi-award-fill"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Quick jump actions */}
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="modern-card p-4">
                <h5 className="fw-bold mb-3">Portfolio Content Sections</h5>
                <div className="list-group list-group-flush">
                  <button
                    onClick={() => setActiveTab('personal')}
                    className="list-group-item list-group-item-action bg-transparent text-body d-flex justify-content-between align-items-center py-3"
                  >
                    <div>
                      <div className="fw-semibold">1. Personal Information</div>
                      <div className="text-muted small">Name, profile picture, phone, location & role</div>
                    </div>
                    <i className="bi bi-chevron-right text-muted"></i>
                  </button>
                  <button
                    onClick={() => setActiveTab('hero')}
                    className="list-group-item list-group-item-action bg-transparent text-body d-flex justify-content-between align-items-center py-3"
                  >
                    <div>
                      <div className="fw-semibold">2. Hero Section</div>
                      <div className="text-muted small">Greeting, intro description, CTA buttons, metrics</div>
                    </div>
                    <i className="bi bi-chevron-right text-muted"></i>
                  </button>
                  <button
                    onClick={() => setActiveTab('about')}
                    className="list-group-item list-group-item-action bg-transparent text-body d-flex justify-content-between align-items-center py-3"
                  >
                    <div>
                      <div className="fw-semibold">3. About Section</div>
                      <div className="text-muted small">Heading, career objective, personal philosophy</div>
                    </div>
                    <i className="bi bi-chevron-right text-muted"></i>
                  </button>
                  <button
                    onClick={() => setActiveTab('resume')}
                    className="list-group-item list-group-item-action bg-transparent text-body d-flex justify-content-between align-items-center py-3"
                  >
                    <div>
                      <div className="fw-semibold">9. Resume File Upload</div>
                      <div className="text-muted small">Upload or replace the downloadable PDF file</div>
                    </div>
                    <i className="bi bi-chevron-right text-muted"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="modern-card p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Recent Inquiries</h5>
                  <button onClick={() => setActiveTab('messages')} className="btn btn-sm btn-link text-decoration-none">
                    View All ({messages?.length || 0})
                  </button>
                </div>
                {messages && messages.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead>
                        <tr>
                          <th>Sender</th>
                          <th>Subject</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.slice(0, 4).map((msg) => (
                          <tr key={msg._id}>
                            <td>
                              <div className="fw-semibold">{msg.name}</div>
                              <div className="text-muted small">{msg.email}</div>
                            </td>
                            <td>{msg.subject}</td>
                            <td>
                              {msg.read ? (
                                <span className="badge bg-secondary bg-opacity-25 text-body">Read</span>
                              ) : (
                                <span className="badge bg-danger">New</span>
                              )}
                            </td>
                            <td>
                              <button
                                onClick={() => handleMarkAsRead(msg._id)}
                                className="btn btn-sm btn-outline-secondary"
                                title="Toggle Read"
                              >
                                <i className="bi bi-check2"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted small mb-0">No messages received yet.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ======================================================== */}
      {/* TAB 1: PERSONAL INFORMATION */}
      {/* ======================================================== */}
      {activeTab === 'personal' && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="modern-card p-4 p-md-5">
              <h4 className="fw-bold mb-2">1. Personal Information</h4>
              <p className="text-secondary small mb-4">
                Update your primary profile data. Changing your name here automatically updates it across the entire website and navbar.
              </p>

              {profileLoading ? (
                <LoadingSpinner />
              ) : (
                <form onSubmit={handleSaveProfile}>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={profileForm.name || ''}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Short Title / Role *</label>
                      <input
                        type="text"
                        name="shortTitle"
                        className="form-control"
                        value={profileForm.shortTitle || ''}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={profileForm.email || ''}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={profileForm.phone || ''}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Location *</label>
                      <input
                        type="text"
                        name="location"
                        className="form-control"
                        value={profileForm.location || ''}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">Availability Status</label>
                      <input
                        type="text"
                        name="availabilityStatus"
                        className="form-control"
                        value={profileForm.availabilityStatus || ''}
                        onChange={handleProfileChange}
                      />
                    </div>

                    {/* Profile Picture & Upload */}
                    <div className="col-12">
                      <label className="form-label small fw-semibold">Profile Photo URL or Upload</label>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          name="profilePhoto"
                          className="form-control"
                          value={profileForm.profilePhoto || ''}
                          onChange={handleProfileChange}
                          placeholder="https://..."
                        />
                      </div>
                      <div className="d-flex align-items-center gap-3 mt-2">
                        {profileForm.profilePhoto && (
                          <img
                            src={profileForm.profilePhoto}
                            alt="Preview"
                            className="rounded-circle border"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                        )}
                        <div>
                          <label className="btn btn-outline-secondary btn-sm mb-0">
                            <i className="bi bi-upload me-1"></i> {uploadingPhoto ? 'Uploading...' : 'Upload New Photo'}
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={handlePhotoUpload}
                              disabled={uploadingPhoto}
                            />
                          </label>
                          <div className="text-muted small mt-1">Supports PNG, JPG, WEBP, SVG (Max 10MB)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-2 border-top pt-3">
                    <button
                      type="button"
                      onClick={() => setProfileForm(profile || {})}
                      className="btn btn-outline-secondary"
                    >
                      Cancel
                    </button>
                    <button type="submit" disabled={savingProfile} className="btn btn-gradient px-4">
                      {savingProfile ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: HERO SECTION */}
      {/* ======================================================== */}
      {activeTab === 'hero' && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="modern-card p-4 p-md-5">
              <h4 className="fw-bold mb-2">2. Hero Section</h4>
              <p className="text-secondary small mb-4">
                Customize the hero banner greeting, headings, description, metrics, and call-to-action button labels.
              </p>

              <form onSubmit={handleSaveProfile}>
                <div className="row g-3 mb-4">
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold">Greeting Text</label>
                    <input
                      type="text"
                      name="heroGreeting"
                      className="form-control"
                      value={profileForm.heroGreeting || ''}
                      onChange={handleProfileChange}
                      placeholder="Hi, I'm"
                    />
                  </div>
                  <div className="col-md-8">
                    <label className="form-label small fw-semibold">Main Name</label>
                    <input
                      type="text"
                      name="heroName"
                      className="form-control"
                      value={profileForm.heroName || ''}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Professional Title</label>
                    <input
                      type="text"
                      name="heroTitle"
                      className="form-control"
                      value={profileForm.heroTitle || ''}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Hero Description</label>
                    <textarea
                      name="heroDescription"
                      rows={3}
                      className="form-control"
                      value={profileForm.heroDescription || ''}
                      onChange={handleProfileChange}
                    ></textarea>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small fw-semibold">Location</label>
                    <input
                      type="text"
                      name="heroLocation"
                      className="form-control"
                      value={profileForm.heroLocation || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold">Work Type</label>
                    <input
                      type="text"
                      name="heroWorkType"
                      className="form-control"
                      value={profileForm.heroWorkType || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold">Availability Badge</label>
                    <input
                      type="text"
                      name="heroAvailabilityBadge"
                      className="form-control"
                      value={profileForm.heroAvailabilityBadge || ''}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">View Projects Button Text</label>
                    <input
                      type="text"
                      name="heroViewProjectsBtnText"
                      className="form-control"
                      value={profileForm.heroViewProjectsBtnText || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Resume Button Text</label>
                    <input
                      type="text"
                      name="heroResumeBtnText"
                      className="form-control"
                      value={profileForm.heroResumeBtnText || ''}
                      onChange={handleProfileChange}
                    />
                  </div>

                  {/* Metrics */}
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold">Years Experience (e.g. 6+)</label>
                    <input
                      type="text"
                      name="yearsExperience"
                      className="form-control"
                      value={profileForm.yearsExperience || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold">Projects Completed (e.g. 45+)</label>
                    <input
                      type="text"
                      name="projectsCount"
                      className="form-control"
                      value={profileForm.projectsCount || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold">Uptime SLA (e.g. 99.9%)</label>
                    <input
                      type="text"
                      name="uptimeSla"
                      className="form-control"
                      value={profileForm.uptimeSla || ''}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 border-top pt-3">
                  <button
                    type="button"
                    onClick={() => setProfileForm(profile || {})}
                    className="btn btn-outline-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" disabled={savingProfile} className="btn btn-gradient px-4">
                    {savingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: ABOUT SECTION */}
      {/* ======================================================== */}
      {activeTab === 'about' && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="modern-card p-4 p-md-5">
              <h4 className="fw-bold mb-2">3. About Section</h4>
              <p className="text-secondary small mb-4">
                Update your about story, professional background summary, and career objective.
              </p>

              <form onSubmit={handleSaveProfile}>
                <div className="row g-3 mb-4">
                  <div className="col-12">
                    <label className="form-label small fw-semibold">About Heading</label>
                    <input
                      type="text"
                      name="aboutHeading"
                      className="form-control"
                      value={profileForm.aboutHeading || ''}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">About Description (Paragraph 1)</label>
                    <textarea
                      name="aboutDescription"
                      rows={4}
                      className="form-control"
                      value={profileForm.aboutDescription || ''}
                      onChange={handleProfileChange}
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Personal Information / Experience (Paragraph 2)</label>
                    <textarea
                      name="aboutPersonalInfo"
                      rows={4}
                      className="form-control"
                      value={profileForm.aboutPersonalInfo || ''}
                      onChange={handleProfileChange}
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Career Objective</label>
                    <textarea
                      name="aboutCareerObjective"
                      rows={3}
                      className="form-control"
                      value={profileForm.aboutCareerObjective || ''}
                      onChange={handleProfileChange}
                    ></textarea>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 border-top pt-3">
                  <button
                    type="button"
                    onClick={() => setProfileForm(profile || {})}
                    className="btn btn-outline-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" disabled={savingProfile} className="btn btn-gradient px-4">
                    {savingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: SKILLS SECTION */}
      {/* ======================================================== */}
      {activeTab === 'skills' && (
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="modern-card p-4">
              <h5 className="fw-bold mb-3">
                {editingSkill ? 'Edit Technical Skill' : 'Add New Technical Skill'}
              </h5>
              <form onSubmit={handleSaveSkill}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Skill Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. React.js, Docker, MongoDB"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Category *</label>
                  <select
                    className="form-select"
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value as any })}
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Tools">Tools</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    Proficiency: {skillForm.proficiency}%
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    min={10}
                    max={100}
                    value={skillForm.proficiency}
                    onChange={(e) => setSkillForm({ ...skillForm, proficiency: Number(e.target.value) })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Bootstrap Icon Class</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="bi-code-slash"
                    value={skillForm.icon}
                    onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.value })}
                  />
                </div>

                <div className="d-flex gap-2">
                  {editingSkill && (
                    <button type="button" onClick={cancelEditSkill} className="btn btn-outline-secondary w-50">
                      Cancel
                    </button>
                  )}
                  <button type="submit" disabled={savingSkill} className="btn btn-gradient flex-grow-1">
                    {savingSkill ? 'Saving...' : editingSkill ? 'Update Skill' : 'Add Skill'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="modern-card p-4">
              <h5 className="fw-bold mb-3">Registered Skills ({skills?.length || 0})</h5>
              {skillsLoading ? (
                <LoadingSpinner />
              ) : skills && skills.length > 0 ? (
                <div className="row g-2">
                  {skills.map((s) => (
                    <div className="col-md-6" key={s._id}>
                      <div className="p-3 border border-secondary border-opacity-15 rounded-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <i className={`bi ${s.icon || 'bi-code-slash'} text-primary fs-5`}></i>
                          <div>
                            <span className="fw-semibold small">{s.name}</span>
                            <span className="badge bg-secondary bg-opacity-25 ms-2 small">
                              {s.category} ({s.proficiency}%)
                            </span>
                          </div>
                        </div>
                        <div className="d-flex gap-1">
                          <button
                            onClick={() => startEditSkill(s)}
                            className="btn btn-sm btn-outline-primary py-0 px-2"
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(s._id)}
                            className="btn btn-sm btn-outline-danger py-0 px-2"
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted small">No skills registered yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: PROJECTS SECTION */}
      {/* ======================================================== */}
      {activeTab === 'projects' && (
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="modern-card p-4">
              <h5 className="fw-bold mb-3">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h5>
              <form onSubmit={handleSaveProject}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Description *</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Project Image URL or Upload *</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="https://images.unsplash.com/..."
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    required
                  />
                  <label className="btn btn-outline-secondary btn-sm w-100">
                    <i className="bi bi-upload me-1"></i> {uploadingProjImage ? 'Uploading...' : 'Upload Image File'}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleProjectImageUpload}
                      disabled={uploadingProjImage}
                    />
                  </label>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Technologies (comma separated) *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="React, TypeScript, Node.js, MongoDB"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">GitHub Repository Link</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://github.com/..."
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Live Demo Link</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://..."
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                  />
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="featuredCheck"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  />
                  <label className="form-check-label small" htmlFor="featuredCheck">
                    Mark as Featured Project
                  </label>
                </div>

                <div className="d-flex gap-2">
                  {editingProject && (
                    <button type="button" onClick={cancelEditProject} className="btn btn-outline-secondary w-50">
                      Cancel
                    </button>
                  )}
                  <button type="submit" disabled={savingProject} className="btn btn-gradient flex-grow-1">
                    {savingProject ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="modern-card p-4">
              <h5 className="fw-bold mb-3">Portfolio Projects ({projects?.length || 0})</h5>
              {projLoading ? (
                <LoadingSpinner />
              ) : projects && projects.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title & Details</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((proj) => (
                        <tr key={proj._id}>
                          <td style={{ width: '80px' }}>
                            <img
                              src={proj.image}
                              alt={proj.title}
                              className="rounded"
                              style={{ width: '65px', height: '45px', objectFit: 'cover' }}
                            />
                          </td>
                          <td>
                            <div className="fw-semibold">{proj.title}</div>
                            <div className="text-secondary small text-truncate" style={{ maxWidth: '280px' }}>
                              {proj.description}
                            </div>
                            <div className="d-flex flex-wrap gap-1 mt-1">
                              {proj.technologies.slice(0, 3).map((t, i) => (
                                <span key={i} className="badge bg-secondary bg-opacity-25 text-body small">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td>
                            {proj.featured ? (
                              <span className="badge bg-warning text-dark">Featured</span>
                            ) : (
                              <span className="badge bg-secondary bg-opacity-25 text-body">Standard</span>
                            )}
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <button
                                onClick={() => startEditProject(proj)}
                                className="btn btn-sm btn-outline-primary"
                                title="Edit"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj._id)}
                                className="btn btn-sm btn-outline-danger"
                                title="Delete"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted small">No projects created yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: EDUCATION SECTION */}
      {/* ======================================================== */}
      {activeTab === 'education' && (
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="modern-card p-4">
              <h5 className="fw-bold mb-3">
                {editingEducation ? 'Edit Education' : 'Add Education / Degree'}
              </h5>
              <form onSubmit={handleSaveEducation}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">College / Institution Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. UC Berkeley, Stanford"
                    value={educationForm.institution}
                    onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Degree *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. B.S. in Computer Science"
                    value={educationForm.degree}
                    onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Department / Major</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Electrical Engineering & CS"
                    value={educationForm.department}
                    onChange={(e) => setEducationForm({ ...educationForm, department: e.target.value })}
                  />
                </div>
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label small fw-semibold">Year / Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="2019 – 2023"
                      value={educationForm.year}
                      onChange={(e) => setEducationForm({ ...educationForm, year: e.target.value })}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-semibold">CGPA / Grade</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="3.9 / 4.0 or 8.8/10"
                      value={educationForm.cgpa}
                      onChange={(e) => setEducationForm({ ...educationForm, cgpa: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-semibold">Description / Highlights</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Coursework, honors, relevant projects..."
                    value={educationForm.description}
                    onChange={(e) => setEducationForm({ ...educationForm, description: e.target.value })}
                  ></textarea>
                </div>

                <div className="d-flex gap-2">
                  {editingEducation && (
                    <button type="button" onClick={cancelEditEducation} className="btn btn-outline-secondary w-50">
                      Cancel
                    </button>
                  )}
                  <button type="submit" disabled={savingEducation} className="btn btn-gradient flex-grow-1">
                    {savingEducation ? 'Saving...' : editingEducation ? 'Update Education' : 'Save Education'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="modern-card p-4">
              <h5 className="fw-bold mb-3">Education History ({education?.length || 0})</h5>
              {eduLoading ? (
                <LoadingSpinner />
              ) : education && education.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {education.map((edu) => (
                    <div key={edu._id} className="p-3 border border-secondary border-opacity-15 rounded-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="fw-bold mb-0">{edu.degree}</h6>
                          <div className="text-primary small fw-semibold">{edu.institution}</div>
                          {edu.department && <div className="text-muted small">Dept: {edu.department}</div>}
                          {edu.cgpa && (
                            <span className="badge bg-primary bg-opacity-10 text-primary small mt-1">
                              CGPA: {edu.cgpa}
                            </span>
                          )}
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-secondary bg-opacity-25 text-body small">
                            {edu.year || `${edu.startYear} – ${edu.endYear || 'Present'}`}
                          </span>
                          <button
                            onClick={() => startEditEducation(edu)}
                            className="btn btn-sm btn-outline-primary py-0 px-2"
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteEducation(edu._id)}
                            className="btn btn-sm btn-outline-danger py-0 px-2"
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                      {edu.description && <p className="text-secondary small mt-2 mb-0">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted small">No education entries registered.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 7: EXPERIENCE / INTERNSHIP SECTION */}
      {/* ======================================================== */}
      {activeTab === 'experience' && (
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="modern-card p-4">
              <h5 className="fw-bold mb-3">
                {editingExp ? 'Edit Experience / Internship' : 'Add Experience / Internship'}
              </h5>
              <form onSubmit={handleSaveExp}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Company / Organization Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Google, TechNext Labs"
                    value={expForm.company}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Role / Position *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Full Stack Intern / Software Engineer"
                    value={expForm.position}
                    onChange={(e) => setExpForm({ ...expForm, position: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Jun 2022 – Aug 2022 (3 mos)"
                    value={expForm.duration}
                    onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Description *</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Describe your responsibilities, impact, and projects..."
                    value={expForm.description}
                    onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Technologies Used (comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="React, TypeScript, Express, MongoDB"
                    value={expForm.technologies}
                    onChange={(e) => setExpForm({ ...expForm, technologies: e.target.value })}
                  />
                </div>

                {/* Certificate / Offer link */}
                <div className="mb-4">
                  <label className="form-label small fw-semibold">Certificate / Offer Letter Link or Upload</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="https://..."
                    value={expForm.certificateUrl}
                    onChange={(e) => setExpForm({ ...expForm, certificateUrl: e.target.value })}
                  />
                  <label className="btn btn-outline-secondary btn-sm w-100">
                    <i className="bi bi-upload me-1"></i> {uploadingCert ? 'Uploading...' : 'Upload Document/PDF'}
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      hidden
                      onChange={handleCertUpload}
                      disabled={uploadingCert}
                    />
                  </label>
                </div>

                <div className="d-flex gap-2">
                  {editingExp && (
                    <button type="button" onClick={cancelEditExp} className="btn btn-outline-secondary w-50">
                      Cancel
                    </button>
                  )}
                  <button type="submit" disabled={savingExp} className="btn btn-gradient flex-grow-1">
                    {savingExp ? 'Saving...' : editingExp ? 'Update Record' : 'Save Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="modern-card p-4">
              <h5 className="fw-bold mb-3">Work History ({experiences?.length || 0})</h5>
              {expLoading ? (
                <LoadingSpinner />
              ) : experiences && experiences.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {experiences.map((exp) => (
                    <div key={exp._id} className="p-3 border border-secondary border-opacity-15 rounded-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="fw-bold mb-0">{exp.position}</h6>
                          <span className="text-primary small fw-semibold">{exp.company}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-secondary bg-opacity-25 text-body small">
                            {exp.duration || `${exp.startDate} – ${exp.current ? 'Present' : exp.endDate || 'Present'}`}
                          </span>
                          <button
                            onClick={() => startEditExp(exp)}
                            className="btn btn-sm btn-outline-primary py-0 px-2"
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteExp(exp._id)}
                            className="btn btn-sm btn-outline-danger py-0 px-2"
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                      <p className="text-secondary small my-2">{exp.description}</p>
                      {exp.certificateUrl && (
                        <a
                          href={exp.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="badge bg-primary bg-opacity-15 text-primary text-decoration-none small"
                        >
                          <i className="bi bi-patch-check-fill me-1"></i> View Certificate / Offer Letter
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted small">No experience records registered.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 8: SOCIAL MEDIA & CONTACT */}
      {/* ======================================================== */}
      {activeTab === 'socials' && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="modern-card p-4 p-md-5">
              <h4 className="fw-bold mb-2">8. Social Media & Contact Links</h4>
              <p className="text-secondary small mb-4">
                Manage your social profiles and contact channels. These links power your hero, footer, and contact section buttons.
              </p>

              <form onSubmit={handleSaveProfile}>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">GitHub Profile URL</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent text-secondary">
                        <i className="bi bi-github"></i>
                      </span>
                      <input
                        type="url"
                        name="githubUrl"
                        className="form-control"
                        value={profileForm.githubUrl || ''}
                        onChange={handleProfileChange}
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">LinkedIn Profile URL</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent text-secondary">
                        <i className="bi bi-linkedin"></i>
                      </span>
                      <input
                        type="url"
                        name="linkedinUrl"
                        className="form-control"
                        value={profileForm.linkedinUrl || ''}
                        onChange={handleProfileChange}
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Instagram Profile URL</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent text-secondary">
                        <i className="bi bi-instagram"></i>
                      </span>
                      <input
                        type="url"
                        name="instagramUrl"
                        className="form-control"
                        value={profileForm.instagramUrl || ''}
                        onChange={handleProfileChange}
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Twitter / X Profile URL</label>
                    <div className="input-group">
                      <span className="input-group-text bg-transparent text-secondary">
                        <i className="bi bi-twitter-x"></i>
                      </span>
                      <input
                        type="url"
                        name="twitterUrl"
                        className="form-control"
                        value={profileForm.twitterUrl || ''}
                        onChange={handleProfileChange}
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 border-top pt-3">
                  <button
                    type="button"
                    onClick={() => setProfileForm(profile || {})}
                    className="btn btn-outline-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" disabled={savingProfile} className="btn btn-gradient px-4">
                    {savingProfile ? 'Saving...' : 'Save Social Links'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 9: RESUME UPLOAD & MANAGEMENT */}
      {/* ======================================================== */}
      {activeTab === 'resume' && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="modern-card p-4 p-md-5">
              <h4 className="fw-bold mb-2">9. Resume / CV File Management</h4>
              <p className="text-secondary small mb-4">
                Upload or replace your PDF resume. All "Download Resume" buttons on the portfolio will automatically download this file.
              </p>

              <div className="p-4 border border-secondary border-opacity-25 rounded-3 mb-4 bg-primary bg-opacity-5">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-3 fs-3">
                      <i className="bi bi-file-earmark-pdf-fill"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">
                        {profileForm.resumeFileName || 'Default Generated Resume'}
                      </h6>
                      <div className="text-secondary small">
                        {profileForm.resumeUrl ? (
                          <span className="text-success">
                            <i className="bi bi-check-circle-fill me-1"></i> Custom PDF Active ({profileForm.resumeUrl})
                          </span>
                        ) : (
                          <span className="text-warning">
                            <i className="bi bi-info-circle-fill me-1"></i> Interactive Resume page active (/resume)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    {profileForm.resumeUrl && (
                      <a
                        href={profileForm.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className="bi bi-eye me-1"></i> Preview PDF
                      </a>
                    )}
                    <label className="btn btn-gradient btn-sm mb-0">
                      <i className="bi bi-upload me-1"></i> {uploadingResume ? 'Uploading...' : 'Upload / Replace PDF'}
                      <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={handleResumeUpload}
                        disabled={uploadingResume}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveProfile}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Custom Direct Resume URL (Optional)</label>
                  <input
                    type="text"
                    name="resumeUrl"
                    className="form-control"
                    placeholder="/uploads/resume-xxx.pdf or https://drive.google.com/..."
                    value={profileForm.resumeUrl || ''}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label small fw-semibold">Display File Name</label>
                  <input
                    type="text"
                    name="resumeFileName"
                    className="form-control"
                    value={profileForm.resumeFileName || ''}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="d-flex justify-content-end gap-2 border-top pt-3">
                  <button
                    type="button"
                    onClick={() => setProfileForm(profile || {})}
                    className="btn btn-outline-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" disabled={savingProfile} className="btn btn-gradient px-4">
                    {savingProfile ? 'Saving...' : 'Save Resume Settings'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 10: INQUIRIES & MESSAGES */}
      {/* ======================================================== */}
      {activeTab === 'messages' && (
        <div className="modern-card p-4">
          <h5 className="fw-bold mb-3">Received Contact Inquiries ({messages?.length || 0})</h5>
          {msgLoading ? (
            <LoadingSpinner />
          ) : messages && messages.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Sender</th>
                    <th>Subject & Message</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg._id} className={!msg.read ? 'table-active' : ''}>
                      <td className="small text-secondary">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="fw-semibold">{msg.name}</div>
                        <a href={`mailto:${msg.email}`} className="text-primary small">
                          {msg.email}
                        </a>
                      </td>
                      <td>
                        <div className="fw-semibold small">{msg.subject}</div>
                        <div className="text-secondary small">{msg.message}</div>
                      </td>
                      <td>
                        {msg.read ? (
                          <span className="badge bg-secondary bg-opacity-25 text-body">Read</span>
                        ) : (
                          <span className="badge bg-danger">Unread</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            onClick={() => handleMarkAsRead(msg._id)}
                            className="btn btn-sm btn-outline-secondary"
                            title="Toggle Read"
                          >
                            <i className="bi bi-check2"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(msg._id)}
                            className="btn btn-sm btn-outline-danger"
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted small">No inquiries found.</p>
          )}
        </div>
      )}
    </div>
  );
};
