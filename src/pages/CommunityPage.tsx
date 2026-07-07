// src/components/CommunityPage.tsx
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { firestore, signInWithGoogle, signOut } from "./firebaseconfig";
import { AuthContext } from "../pages/AuthContext";
import TrendingTopics from "../components/TrendingTopics";
import RecentDiscussions from "../components/RecentDiscussions";
import DiscussionPage from "./DiscussionPage";
import SignUpPage from "../components/SignUpPage";
import SignInPage from "../components/SignInPage";
// yaha se railway ka dal dena auth backend ke liye

// Interfaces for types
interface Discussion {
  id: string;
  title: string;
  description: string;
  repliesCount: number;
  createdAt: Timestamp | null;
  authorId: string;
  authorName: string;
}

const CommunityPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // Add useNavigate if needed jab usko railway se liye 

  // Fetch discussions from Firestore
  useEffect(() => {
    const discussionsRef = collection(firestore, "discussions");
    const discussionsQuery = query(
      discussionsRef,
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(discussionsQuery, (snapshot) => {
      const discussionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Discussion, "id">),
      }));
      setDiscussions(discussionsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle new discussion input changes
  const handleNewDiscussionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewDiscussion((prev) => ({ ...prev, [name]: value }));
  };

  // Post a new discussion
  const handlePostDiscussion = async () => {
    if (!newDiscussion.title || !newDiscussion.description) {
      alert("Please fill in both fields to post a discussion.");
      return;
    }

    if (!user) {
      alert("Please sign in to post a discussion.");
      return;
    }

    const newDisc: Omit<Discussion, "id"> = {
      title: newDiscussion.title,
      description: newDiscussion.description,
      repliesCount: 0,
      createdAt: serverTimestamp() as Timestamp,
      authorId: user.uid,
      authorName: user.displayName || "Anonymous",
    };

    try {
      await addDoc(collection(firestore, "discussions"), newDisc);
      setNewDiscussion({ title: "", description: "" });
      alert("New discussion posted!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };


  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };


  const trendingTopics = [...discussions]
    .sort((a, b) => b.repliesCount - a.repliesCount)
    .slice(0, 5);


  const sampleTrendingTopics = [
    { id: "1", title: "#nextexamprep", repliesCount: 0 },
    { id: "2", title: "#placementdrive2025", repliesCount: 0 },
    { id: "3", title: "#campusfest", repliesCount: 0 },
  ];


  const currentDiscussion = discussions[0];

  // Sample recent discussion to display if none are available
  const sampleRecentDiscussion: Discussion = {
    id: "sample1",
    title: "How to prepare for upcoming exams?",
    description: "Share your tips and resources for exam preparation.",
    repliesCount: 0,
    createdAt: null,
    authorId: "sampleUser",
    authorName: "Anonymous",
  };

  return (
    <div className="min-h-screen py-16 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900">
            👥 Discourse
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-850 dark:text-slate-100 tracking-tight">
            Community Hub
          </h1>
          <p className="text-slate-650 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Join academic discussions, share lecture insights, and collaborate anonymously with fellow peers.
          </p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Join Our Community */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100">
                Join Our Community
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Connect with students, exchange tips, and share materials. Express your views anonymously if you prefer.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              {user ? (
                currentDiscussion && (
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-350">
                      Active:{" "}
                      <Link
                        to={`/discussion/${currentDiscussion.id}`}
                        className="text-indigo-650 dark:text-indigo-455 hover:underline font-bold"
                      >
                        {currentDiscussion.title}
                      </Link>
                    </p>
                    <Link
                      to={`/discussion/${currentDiscussion.id}`}
                      className="w-full inline-flex justify-center items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
                    >
                      Join Discussion
                    </Link>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center">
                      {currentDiscussion.repliesCount} students active
                    </p>
                  </div>
                )
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
                    Sign in to participate in discussion forums and connect with university peers.
                  </p>
                  <Link
                    to="/signin"
                    className="w-full inline-flex justify-center items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Trending Topics */}
          <TrendingTopics
            topics={
              user && trendingTopics.length > 0
                ? trendingTopics
                : sampleTrendingTopics
            }
          />

          {/* Start a New Discussion */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            {user ? (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100">
                  Start a New Discussion
                </h3>
                <input
                  type="text"
                  name="title"
                  value={newDiscussion.title}
                  onChange={handleNewDiscussionChange}
                  placeholder="Discussion Title"
                  className="w-full bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500"
                />
                <textarea
                  name="description"
                  value={newDiscussion.description}
                  onChange={handleNewDiscussionChange}
                  placeholder="What would you like to discuss?"
                  className="w-full bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500"
                  rows={3}
                ></textarea>
                <div className="flex gap-2">
                  <button
                    onClick={handlePostDiscussion}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm"
                  >
                    Post Discussion
                  </button>
                  <button
                    onClick={signOut}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100">
                    Create Discussion
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                    Have a doubt, query, or feedback? Sign in to create a thread and get responses from the student community.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to="/signin"
                    className="w-full inline-flex justify-center items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
                  >
                    Sign In
                  </Link>
                  <p className="mt-3 text-center text-xs text-slate-400 dark:text-slate-550">
                    Don't have an account?{" "}
                    <Link
                      to="/signin"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                    >
                      Sign Up Now
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Discussions */}
        <div className="mt-12">
          {loading ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
              Loading discussions...
            </div>
          ) : user && discussions.length > 0 ? (
            <RecentDiscussions
              discussions={discussions.slice(0, visibleCount)}
              onLoadMore={handleLoadMore}
              hasMore={visibleCount < discussions.length}
            />
          ) : (
            // Display sample recent discussion for non-signed-in users
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100 mb-6">
                Recent Discussions
              </h3>
              <ul className="divide-y divide-slate-100 dark:divide-slate-850">
                <li className="py-4 first:pt-0 last:pb-0">
                  <Link to="/signin" className="block group">
                    <div className="flex justify-between items-center gap-2">
                      <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {sampleRecentDiscussion.title}
                      </h4>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Just now</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-slate-550 dark:text-slate-400 text-xs sm:text-sm">
                        {sampleRecentDiscussion.description}
                      </p>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        {sampleRecentDiscussion.repliesCount} replies
                      </span>
                    </div>
                  </Link>
                </li>
              </ul>
              <p className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-850 text-center text-xs text-slate-500 dark:text-slate-400">
                <Link
                  to="/signin"
                  className="text-indigo-650 dark:text-indigo-400 hover:underline font-bold"
                >
                  Sign Up
                </Link>{" "}
                to view more discussions and contribute to threads.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
