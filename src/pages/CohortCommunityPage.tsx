/**
 * LearnPath Cohort Network & Peer Discussion Lounge
 * Inspired by the Nigerian Federal Ministry of Innovation, Science and Technology (FMIST)
 * Youth and Students in Innovation (YSI) Programme Participant Directory & Innovation Portal:
 * - Specialization tracks: AI, Data Science, Software Engineering, MLOps, IoT & CleanTech
 * - Participants directory with State of Origin, Academic Institution, Innovation Projects
 * - Real-time 1-on-1 Direct Messaging & Chat with respective members
 * - Collaborative Channel Lounges with syntax-highlighted code sharing
 * - Innovation Projects Showcase with peer reviews and field validation badges
 */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { useToast } from '../context/ToastContext.tsx';
import { api } from '../api/client.ts';
import { CommunityMessage, ParticipantCohortMember, DirectChatMessage, InnovationProject } from '../types/index.ts';
import {
  Users,
  MessageSquare,
  Send,
  Code2,
  Heart,
  Flame,
  Search,
  CheckCircle2,
  Filter,
  Sparkles,
  Layers,
  ChevronRight,
  Shield,
  Smile,
  X,
  MapPin,
  Building2,
  Lightbulb,
  Star,
  ExternalLink,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';

interface CohortCommunityPageProps {
  onNavigate: (view: string, param?: string) => void;
}

const CHANNELS = [
  { id: 'general-lounge', name: 'General Lounge', icon: MessageSquare, description: 'Cohort announcements, introductions & interdisciplinary collaboration' },
  { id: 'ai-deep-learning', name: 'AI & Deep Learning', icon: Sparkles, description: 'Tensor calculus, Transformers, Attention math & neural networks' },
  { id: 'software-systems', name: 'Software & Systems', icon: Code2, description: 'Full-stack protocols, database locks, ACID invariants & architectures' },
  { id: 'data-science', name: 'Data Science & Analytics', icon: Layers, description: 'Probability, hypothesis testing, PCA decomposition & pandas' },
  { id: 'mlops-pipelines', name: 'MLOps & Model Serving', icon: Layers, description: 'Feature stores, drift detection, gRPC/REST inference microservices' },
];

export const CohortCommunityPage: React.FC<CohortCommunityPageProps> = ({ onNavigate }) => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'channels' | 'directory' | 'showcase'>('directory');
  const [activeChannel, setActiveChannel] = useState<string>('general-lounge');

  // Channel discussion state
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [members, setMembers] = useState<ParticipantCohortMember[]>([]);
  const [projects, setProjects] = useState<InnovationProject[]>([]);
  const [loading, setLoading] = useState(true);

  // New channel message state
  const [content, setContent] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState<'python' | 'typescript' | 'sql'>('python');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Direct Message Modal State (1-on-1 Chat with Respective Members)
  const [activeChatRecipient, setActiveChatRecipient] = useState<ParticipantCohortMember | null>(null);
  const [directMessages, setDirectMessages] = useState<DirectChatMessage[]>([]);
  const [directMsgText, setDirectMsgText] = useState('');
  const [directCodeLanguage, setDirectCodeLanguage] = useState<'python' | 'typescript' | 'sql'>('python');
  const [directCodeSnippet, setDirectCodeSnippet] = useState('');
  const [showDirectCode, setShowDirectCode] = useState(false);
  const [sendingDirectMsg, setSendingDirectMsg] = useState(false);

  // Filters
  const [memberSearch, setMemberSearch] = useState('');
  const [selectedTrackFilter, setSelectedTrackFilter] = useState('all');
  const [selectedStateFilter, setSelectedStateFilter] = useState('all');

  const fetchCommunityData = async () => {
    try {
      setLoading(true);
      const [msgRes, memRes, projRes] = await Promise.all([
        api.getCommunityMessages(activeChannel),
        api.getCohortMembers(),
        api.getInnovationProjects(),
      ]);
      setMessages(msgRes.messages);
      setMembers(memRes.members);
      setProjects(projRes.projects);
    } catch (err) {
      console.error('Failed to load community data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityData();
  }, [activeChannel]);

  // Load Direct Messages when recipient changes
  const loadDirectChat = async (recipient: ParticipantCohortMember) => {
    setActiveChatRecipient(recipient);
    try {
      const res = await api.getDirectMessages(recipient.id);
      setDirectMessages(res.messages || []);
    } catch (err) {
      console.error('Failed to load direct messages', err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !codeSnippet.trim()) return;

    try {
      setIsSubmitting(true);
      const payloadCode = showCodeInput && codeSnippet.trim()
        ? { language: codeLanguage, code: codeSnippet }
        : undefined;

      const res = await api.postCommunityMessage(activeChannel, content, payloadCode);
      setMessages((prev) => [...prev, res.message]);
      setContent('');
      setCodeSnippet('');
      setShowCodeInput(false);
      showToast('Message posted to channel', 'success');

      // Update streak dynamically
      await api.touchActivity();
      if (refreshUser) await refreshUser();
    } catch (err: any) {
      showToast(err.message || 'Failed to post message', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeMessage = async (msgId: string) => {
    try {
      const res = await api.likeCommunityMessage(msgId);
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? res.message : m))
      );
    } catch (err) {
      console.error('Failed to like message', err);
    }
  };

  const handleSendDirectMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChatRecipient || (!directMsgText.trim() && !directCodeSnippet.trim())) return;

    try {
      setSendingDirectMsg(true);
      const payloadCode = showDirectCode && directCodeSnippet.trim()
        ? { language: directCodeLanguage, code: directCodeSnippet }
        : undefined;

      const res = await api.sendDirectMessage(activeChatRecipient.id, directMsgText, payloadCode);
      setDirectMessages((prev) => [...prev, res.message]);
      setDirectMsgText('');
      setDirectCodeSnippet('');
      setShowDirectCode(false);
      showToast(`Message sent to ${activeChatRecipient.fullName}`, 'success');

      // Update streak dynamically
      await api.touchActivity();
      if (refreshUser) await refreshUser();
    } catch (err: any) {
      showToast(err.message || 'Failed to send message', 'error');
    } finally {
      setSendingDirectMsg(false);
    }
  };

  const handleLikeProject = async (projId: string) => {
    try {
      const res = await api.likeInnovationProject(projId);
      setProjects((prev) =>
        prev.map((p) => (p.id === projId ? res.project : p))
      );
      showToast('Project starred!', 'success');
    } catch (err) {
      console.error('Failed to star project', err);
    }
  };

  // Distinct states for filter
  const distinctStates = Array.from(new Set(members.map((m) => m.stateOfOrigin).filter(Boolean)));

  const filteredMembers = members.filter((m) => {
    const matchSearch =
      m.fullName.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.specializationTrack.toLowerCase().includes(memberSearch.toLowerCase()) ||
      (m.institutionOrOrg && m.institutionOrOrg.toLowerCase().includes(memberSearch.toLowerCase())) ||
      (m.innovationProjectTitle && m.innovationProjectTitle.toLowerCase().includes(memberSearch.toLowerCase()));
    
    const matchTrack = selectedTrackFilter === 'all' || m.specializationTrack.toLowerCase().includes(selectedTrackFilter.toLowerCase());
    const matchState = selectedStateFilter === 'all' || m.stateOfOrigin === selectedStateFilter;
    return matchSearch && matchTrack && matchState;
  });

  const currentChannelMeta = CHANNELS.find((c) => c.id === activeChannel) || CHANNELS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Header Banner */}
      <div className="bg-[#17365D] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md border border-blue-900/30">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>Youth & Students Innovation (YSI) Cohort Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Innovator Cohort Directory & Peer Collaboration
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
            Collaborate directly with fellow researchers across AI, Data Science, Software Engineering, and MLOps. Explore member innovation projects, participate in channel discussions, and chat 1-on-1 with cohort members.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-blue-900/40 border border-blue-400/30 p-4 rounded-xl shrink-0 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-white tabular-nums text-sm">{members.length} Innovators</div>
              <div className="text-blue-200 text-[11px]">Enrolled in Cohort</div>
            </div>
          </div>
          <div className="h-8 w-px bg-blue-400/20 hidden sm:block" />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-white tabular-nums text-sm">{projects.length} Projects</div>
              <div className="text-blue-200 text-[11px]">Field Validated</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Navigation Tabs: Directory | Projects | Channels */}
      <div className="flex items-center border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('directory')}
          className={`pb-3.5 px-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'directory'
              ? 'border-[#17365D] text-[#17365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Participant Directory ({members.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('showcase')}
          className={`pb-3.5 px-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'showcase'
              ? 'border-[#17365D] text-[#17365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>Innovation Showcase ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('channels')}
          className={`pb-3.5 px-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === 'channels'
              ? 'border-[#17365D] text-[#17365D]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Channel Discussion Lounge</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: PARTICIPANTS DIRECTORY WITH CHAT ACTION                */}
      {/* ============================================================== */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Search & Filters */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                placeholder="Search scholar, state, institution, or project..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17365D]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-semibold">Track:</span>
                <select
                  value={selectedTrackFilter}
                  onChange={(e) => setSelectedTrackFilter(e.target.value)}
                  className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#17365D]"
                >
                  <option value="all">All Specializations</option>
                  <option value="Software">Software Engineering</option>
                  <option value="Artificial Intelligence">AI & Deep Learning</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Machine Learning">MLOps</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Clean Energy">Clean Energy & IoT</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-semibold">State:</span>
                <select
                  value={selectedStateFilter}
                  onChange={(e) => setSelectedStateFilter(e.target.value)}
                  className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#17365D]"
                >
                  <option value="all">All States</option>
                  {distinctStates.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => {
              const isCurrentUser = user?.id === member.id;
              return (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  {/* Status Banner */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={member.avatarUrl}
                          alt={member.fullName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-100"
                        />
                        {member.isOnline && (
                          <span
                            className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
                            title="Online"
                          />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-extrabold text-slate-900">{member.fullName}</h3>
                          {isCurrentUser && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded-md">
                              You
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-medium text-blue-700 block mt-0.5">
                          {member.specializationTrack}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200 shrink-0">
                      <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
                      <span>{member.learningStreak}d</span>
                    </div>
                  </div>

                  {/* Institutional & Regional Metadata */}
                  <div className="space-y-2 text-xs text-slate-600 mb-4 border-t border-slate-100 pt-3">
                    {member.institutionOrOrg && (
                      <div className="flex items-center gap-2 text-slate-700 font-medium truncate">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{member.institutionOrOrg}</span>
                      </div>
                    )}
                    {member.stateOfOrigin && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{member.stateOfOrigin}</span>
                      </div>
                    )}
                  </div>

                  {/* Innovation Project Highlight */}
                  {member.innovationProjectTitle && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                        <Lightbulb className="w-3 h-3 text-amber-500" />
                        <span>Innovation Project</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {member.innovationProjectTitle}
                      </h4>
                      {member.innovationProjectPitch && (
                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                          {member.innovationProjectPitch}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Skills Badges */}
                  {member.skillsTags && member.skillsTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.skillsTags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action: Direct Message / Chat */}
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => loadDirectChat(member)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#17365D] hover:bg-blue-900 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat with {member.fullName.split(' ')[0]}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: COHORT INNOVATION PROJECT SHOWCASE                     */}
      {/* ============================================================== */}
      {activeTab === 'showcase' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Youth & Students Innovation Projects
              </h2>
              <p className="text-xs text-slate-500">
                Field-validated technology prototypes and capstone research submitted by cohort fellows.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg">
              {projects.length} Active Prototypes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => {
              const isLiked = user && proj.likedBy?.includes(user.id);
              return (
                <div
                  key={proj.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        {proj.track}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          proj.status === 'Field Validated'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : proj.status === 'In Incubation'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {proj.status}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {proj.abstract}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author & Star Action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={proj.authorAvatar}
                        alt={proj.authorName}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block">{proj.authorName}</span>
                        <span className="text-[10px] text-slate-500 block">{proj.authorInstitution}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLikeProject(proj.id)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                          isLiked
                            ? 'bg-amber-50 text-amber-700 border-amber-300'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-amber-500' : 'text-slate-400'}`} />
                        <span>{proj.likesCount || 0}</span>
                      </button>

                      <button
                        onClick={() => {
                          const author = members.find((m) => m.id === proj.authorId);
                          if (author) loadDirectChat(author);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#17365D] hover:bg-blue-900 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: CHANNELS DISCUSSION LOUNGE                             */}
      {/* ============================================================== */}
      {activeTab === 'channels' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Channel Nav Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider px-2">
                Curriculum Topic Lounges
              </h3>
              <div className="space-y-1">
                {CHANNELS.map((ch) => {
                  const Icon = ch.icon;
                  const isActive = activeChannel === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => setActiveChannel(ch.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 ${
                        isActive
                          ? 'bg-[#17365D] text-white shadow-xs'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate">#{ch.name}</div>
                        <div className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                          {ch.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-blue-50/60 border border-blue-200 rounded-xl px-4 py-3 flex items-center justify-between text-xs text-blue-900">
              <div>
                <span className="font-bold">#{currentChannelMeta.name}</span>
                <span className="text-blue-700 ml-2 hidden sm:inline">· {currentChannelMeta.description}</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-600 tabular-nums">
                {messages.length} messages
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 min-h-[420px] shadow-2xs">
              {loading ? (
                <div className="text-center py-20 text-xs text-slate-400">Loading channel messages...</div>
              ) : messages.length > 0 ? (
                messages.map((msg) => {
                  const isLiked = user && msg.likedBy?.includes(user.id);
                  return (
                    <div key={msg.id} className="space-y-3 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={msg.senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                            alt={msg.senderName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-900">{msg.senderName}</span>
                            <span className="text-[10px] text-slate-400 ml-2">
                              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleLikeMessage(msg.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            isLiked
                              ? 'bg-rose-50 text-rose-600 border border-rose-200'
                              : 'text-slate-500 hover:bg-slate-50'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-rose-500' : ''}`} />
                          <span className="tabular-nums">{msg.likesCount || 0}</span>
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>

                      {msg.codeSnippet && (
                        <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 text-slate-200 text-xs font-mono">
                          <div className="bg-slate-800 px-3 py-1.5 text-[11px] text-slate-300 font-bold border-b border-slate-700 flex justify-between">
                            <span>{msg.codeSnippet.language}</span>
                            <span className="text-slate-400">snippet</span>
                          </div>
                          <pre className="p-3 overflow-x-auto text-[11px] leading-relaxed">
                            {msg.codeSnippet.code}
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-20 space-y-2 text-slate-400">
                  <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs font-medium">No messages in this lounge yet. Start the conversation!</p>
                </div>
              )}
            </div>

            {/* Input Composer */}
            <form onSubmit={handleSendMessage} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Participate in #{currentChannelMeta.name}</span>
                <button
                  type="button"
                  onClick={() => setShowCodeInput(!showCodeInput)}
                  className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md transition-colors ${
                    showCodeInput ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{showCodeInput ? 'Hide Code' : 'Attach Code Snippet'}</span>
                </button>
              </div>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Share insights, ask questions on ${currentChannelMeta.name}, or collaborate...`}
                rows={3}
                className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#17365D]"
              />

              {showCodeInput && (
                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-700">Language:</span>
                    <select
                      value={codeLanguage}
                      onChange={(e) => setCodeLanguage(e.target.value as any)}
                      className="text-xs border border-slate-300 rounded px-2 py-1 bg-white"
                    >
                      <option value="python">Python</option>
                      <option value="typescript">TypeScript</option>
                      <option value="sql">SQL</option>
                    </select>
                  </div>
                  <textarea
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    placeholder="Paste your source code or algorithmic invariant..."
                    rows={4}
                    className="w-full font-mono text-[11px] p-2.5 bg-slate-900 text-emerald-400 rounded-lg border border-slate-700 focus:outline-none"
                  />
                </div>
              )}

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || (!content.trim() && !codeSnippet.trim())}
                  className="px-4 py-2 bg-[#17365D] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Posting...' : 'Post Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: 1-ON-1 DIRECT CHAT WITH RESPECTIVE MEMBER              */}
      {/* ============================================================== */}
      {activeChatRecipient && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full h-[600px] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="bg-[#17365D] text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <img
                  src={activeChatRecipient.avatarUrl}
                  alt={activeChatRecipient.fullName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold">{activeChatRecipient.fullName}</h3>
                    {activeChatRecipient.isOnline && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded">
                        Online
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-blue-200">
                    {activeChatRecipient.institutionOrOrg || activeChatRecipient.specializationTrack}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveChatRecipient(null)}
                className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-header details */}
            {activeChatRecipient.innovationProjectTitle && (
              <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 flex items-center justify-between text-xs text-blue-900 shrink-0">
                <span className="truncate">
                  Project: <strong>{activeChatRecipient.innovationProjectTitle}</strong>
                </span>
                <span className="text-[11px] text-blue-700 shrink-0 ml-2">
                  {activeChatRecipient.stateOfOrigin}
                </span>
              </div>
            )}

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {directMessages.length > 0 ? (
                directMessages.map((msg) => {
                  const isMe = user?.id === msg.senderId;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] text-slate-400 mb-1 px-1">
                        {isMe ? 'You' : msg.senderName} · {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>

                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                          isMe
                            ? 'bg-[#17365D] text-white rounded-br-xs shadow-xs'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>

                        {msg.codeSnippet && (
                          <div className="mt-2 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 text-emerald-400 font-mono text-[10px] p-2.5">
                            <div className="text-slate-400 text-[9px] mb-1 uppercase font-bold">
                              {msg.codeSnippet.language} snippet
                            </div>
                            <pre className="overflow-x-auto">{msg.codeSnippet.code}</pre>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-16 space-y-2 text-slate-400">
                  <MessageCircle className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs">No direct messages yet. Say hello to {activeChatRecipient.fullName}!</p>
                </div>
              )}
            </div>

            {/* Chat Composer */}
            <form onSubmit={handleSendDirectMessage} className="p-3 bg-white border-t border-slate-200 space-y-2 shrink-0">
              {showDirectCode && (
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700">Language:</span>
                    <select
                      value={directCodeLanguage}
                      onChange={(e) => setDirectCodeLanguage(e.target.value as any)}
                      className="text-xs border border-slate-300 rounded px-2 py-0.5 bg-white"
                    >
                      <option value="python">Python</option>
                      <option value="typescript">TypeScript</option>
                      <option value="sql">SQL</option>
                    </select>
                  </div>
                  <textarea
                    value={directCodeSnippet}
                    onChange={(e) => setDirectCodeSnippet(e.target.value)}
                    placeholder="Attach code snippet..."
                    rows={3}
                    className="w-full font-mono text-[11px] p-2 bg-slate-900 text-emerald-400 rounded-lg focus:outline-none"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowDirectCode(!showDirectCode)}
                  className={`p-2 rounded-lg border transition-colors ${
                    showDirectCode ? 'bg-blue-50 text-blue-700 border-blue-300' : 'text-slate-400 hover:text-slate-600 border-slate-200'
                  }`}
                  title="Attach code snippet"
                >
                  <Code2 className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={directMsgText}
                  onChange={(e) => setDirectMsgText(e.target.value)}
                  placeholder={`Message ${activeChatRecipient.fullName.split(' ')[0]}...`}
                  className="flex-1 text-xs border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17365D]"
                />

                <button
                  type="submit"
                  disabled={sendingDirectMsg || (!directMsgText.trim() && !directCodeSnippet.trim())}
                  className="p-2 bg-[#17365D] hover:bg-blue-900 text-white rounded-xl transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
