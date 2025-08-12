"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/ui/avatar";
import ToastNotification from "@/components/ui/toast";
import { Mail, Calendar, User, MapPin, Camera } from "lucide-react";
import Loading from "@/components/ui/loading";

interface UserProfile {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  createdAt?: string;
}

interface UserStats {
  totalTrips: number;
  totalCountries: number;
  upcomingTrips: number;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{show: boolean; type: "success" | "error" | "warning" | "info"; message: string}>({
    show: false,
    type: "info",
    message: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        
        if (data.success) {
          setProfile(data.user);
        } else {
          setToast({
            show: true,
            type: "error",
            message: "Please sign in to view your profile"
          });
        }
      } catch {
        setToast({
          show: true,
          type: "error",
          message: "Failed to load profile"
        });
      }
    };

    const fetchStats = async () => {
      try {
        const response = await fetch('/api/user/stats');
        const data = await response.json();
        
        if (data.success) {
          setStats(data.stats);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <Loading label="Loading profile..." />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card-surface">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <h3 className="text-xl font-medium mb-4">Please sign in</h3>
                <p className="text-main">You need to sign in to view your profile</p>
                <Button onClick={() => window.location.href = '/api/auth/signin'}>
                  Sign In
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-main mb-2">Profile</h1>
            <p className="text-main">Manage your personal information and travel stats</p>
          </div>

          {/* Profile Card */}
          <Card className="bg-card-surface">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-main">
                <User className="h-5 w-5" />
                Personal Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <UserAvatar user={profile} size="xl" />
                  <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-card-main mb-2">
                    {profile.name || "User"}
                  </h2>
                  
                  <div className="space-y-2 text-main">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{profile.email}</span>
                    </div>
                    
                    {profile.createdAt && (
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Member since {new Date(profile.createdAt).toLocaleDateString('en-US')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-card-surface">
                <CardContent className="flex items-center p-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-main">{stats.totalTrips}</p>
                    <p className="text-main">Total Trips</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card-surface">
                <CardContent className="flex items-center p-6">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-main">{stats.totalCountries}</p>
                    <p className="text-main">Countries Visited</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card-surface">
                <CardContent className="flex items-center p-6">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full mr-4">
                    <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-300" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-main">{stats.upcomingTrips}</p>
                    <p className="text-main">Upcoming Trips</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Actions */}
          <Card className="bg-card-surface">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1">
                  Edit Profile
                </Button>
                <Button variant="outline" className="flex-1">
                  Change Password
                </Button>
                <Button variant="outline" className="flex-1 text-red-600 border-red-300 hover:bg-red-50">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ToastNotification
        type={toast.type}
        message={toast.message}
        show={toast.show}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
}


