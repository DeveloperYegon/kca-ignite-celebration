import { useState } from 'react';
import { Calendar, MapPin, Hash, Users, Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import SpeakerModal from '@/components/SpeakerModal';
import SpeakerHoverModal from '@/components/SpeakerHoverModal';
import heroBg from '@/assets/hero-bg.jpg';
import keynoteSpeaker from '@/assets/keynote-speaker.jpg';
import objectivesImage from '@/assets/objectives-image.jpg';
import eventHighlights from '@/assets/event-highlights.jpg';

// Sample data
const speakers = [
  {
    id: '1',
    name: 'Dr. Sarah Tech',
    designation: 'Chief Innovation Officer',
    company: 'TechCorp Global',
    bio: 'Dr. Sarah Tech is a renowned technology leader with over 15 years of experience driving digital transformation in Fortune 500 companies. She has led groundbreaking initiatives in AI, blockchain, and sustainable technology solutions.',
    image: keynoteSpeaker,
    expertise: ['Artificial Intelligence', 'Digital Transformation', 'Sustainable Tech', 'Innovation Strategy'],
    experience: '15+ years',
    achievements: [
      'Led digital transformation for 50+ global organizations',
      'Published 30+ research papers on AI ethics',
      'Winner of Tech Innovation Award 2023',
      'Speaker at 100+ international conferences',
    ],
  },
  {
    id: '2',
    name: 'Mark Johnson',
    designation: 'Startup Founder',
    company: 'InnovateLab',
    bio: 'Serial entrepreneur and innovation mentor who has founded 3 successful startups in the fintech and edtech space. Mark is passionate about empowering the next generation of entrepreneurs.',
    image: keynoteSpeaker,
    expertise: ['Entrepreneurship', 'Fintech', 'EdTech', 'Venture Capital'],
    experience: '12+ years',
    achievements: [
      'Founded 3 successful startups with $50M+ valuation',
      'Mentored 200+ student entrepreneurs',
      'Raised $25M in venture funding',
      'Featured in Forbes 30 Under 30',
    ],
  },
  {
    id: '3',
    name: 'Prof. Alice Data',
    designation: 'Data Science Director',
    company: 'DataCorp Analytics',
    bio: 'Leading expert in data science and machine learning applications in education and business intelligence. Prof. Alice has transformed how organizations leverage data for strategic decision-making.',
    image: keynoteSpeaker,
    expertise: ['Data Science', 'Machine Learning', 'Business Intelligence', 'Analytics'],
    experience: '10+ years',
    achievements: [
      'Developed ML models serving 1M+ users',
      'Published book on "Data-Driven Education"',
      'Led data initiatives for 20+ universities',
      'Keynote speaker at DataCon 2023',
    ],
  },
  {
    id: '4',
    name: 'James Innovation',
    designation: 'Product Manager',
    company: 'Future Labs',
    bio: 'Product innovation specialist focused on user-centered design and emerging technologies. James has launched 15+ successful products that have reached millions of users worldwide.',
    image: keynoteSpeaker,
    expertise: ['Product Management', 'UX Design', 'Innovation', 'Strategy'],
    experience: '8+ years',
    achievements: [
      'Launched 15+ products reaching 10M+ users',
      'Led product teams in Silicon Valley',
      'Innovation award winner 2022',
      'Certified in Design Thinking methodologies',
    ],
  },
];

const scheduleData = {
  day1: {
    date: 'October 15, 2024',
    events: [
      { time: '9:00 AM', theme: 'Opening Ceremony & Welcome', speaker: 'Dr. Sarah Tech', venue: 'Main Hall' },
      {
        time: '10:30 AM',
        breakoutSessions: [
          { room: 'Room 1', theme: 'Future of AI in Education', speaker: 'Dr. Sarah Tech' },
          { room: 'Room 2', theme: 'Entrepreneurial Mindset', speaker: 'Mark Johnson' },
          { room: 'Room 3', theme: 'Data-Driven Learning', speaker: 'Prof. Alice Data' },
        ],
      },
      { time: '12:00 PM', theme: 'Lunch & Networking', speaker: '', venue: 'Dining Hall' },
      {
        time: '2:00 PM',
        breakoutSessions: [
          { room: 'Room 1', theme: 'Startup Ecosystem', speaker: 'Mark Johnson' },
          { room: 'Room 2', theme: 'Product Innovation Strategies', speaker: 'James Innovation' },
        ],
      },
      { time: '3:30 PM', theme: 'Interactive Workshops', speaker: 'All Speakers', venue: 'Workshop Hall' },
      { time: '5:00 PM', theme: 'Day 1 Closing & Networking', speaker: '', venue: 'Main Hall' },
    ],
  },
  day2: {
    date: 'October 16, 2024',
    events: [
      { time: '9:00 AM', theme: 'Digital Transformation Keynote', speaker: 'Dr. Sarah Tech', venue: 'Main Hall' },
      {
        time: '10:30 AM',
        breakoutSessions: [
          { room: 'Room 1', theme: 'Blockchain in Education', speaker: 'Dr. Sarah Tech' },
          { room: 'Room 2', theme: 'Scaling Startups', speaker: 'Mark Johnson' },
          { room: 'Room 3', theme: 'Machine Learning Applications', speaker: 'Prof. Alice Data' },
        ],
      },
      { time: '12:00 PM', theme: 'Lunch & Innovation Expo', speaker: '', venue: 'Exhibition Hall' },
      {
        time: '2:00 PM',
        breakoutSessions: [
          { room: 'Room 1', theme: 'Data Science in Action', speaker: 'Prof. Alice Data' },
          { room: 'Room 2', theme: 'User-Centered Design', speaker: 'James Innovation' },
        ],
      },
      { time: '3:30 PM', theme: 'Panel Discussion: Future Tech', speaker: 'All Speakers', venue: 'Main Hall' },
      { time: '5:00 PM', theme: 'Innovation Showcase', speaker: '', venue: 'Exhibition Hall' },
    ],
  },
  day3: {
    date: 'October 17, 2024',
    events: [
      { time: '9:00 AM', theme: 'AI & Machine Learning Summit', speaker: 'Prof. Alice Data', venue: 'Main Hall' },
      {
        time: '10:30 AM',
        breakoutSessions: [
          { room: 'Room 1', theme: 'Sustainable Tech Solutions', speaker: 'Dr. Sarah Tech' },
          { room: 'Room 2', theme: 'Building Sustainable Startups', speaker: 'Mark Johnson' },
          { room: 'Room 3', theme: 'Innovation in Product Design', speaker: 'James Innovation' },
        ],
      },
      { time: '12:00 PM', theme: 'Awards Lunch', speaker: '', venue: 'Dining Hall' },
      {
        time: '2:00 PM',
        breakoutSessions: [
          { room: 'Room 1', theme: 'Innovation Competition Finals', speaker: 'James Innovation' },
          { room: 'Room 2', theme: 'Future of Analytics', speaker: 'Prof. Alice Data' },
        ],
      },
      { time: '4:00 PM', theme: 'Closing Ceremony & Awards', speaker: 'Dr. Sarah Tech', venue: 'Main Hall' },
      { time: '5:30 PM', theme: 'Farewell Reception', speaker: '', venue: 'Main Hall' },
    ],
  },
};

const partners = [
  'Microsoft',
  'Google',
  'IBM',
  'Amazon Web Services',
  'Intel',
  'NVIDIA',
  'Safaricom',
  'KCB Bank',
  'Equity Bank',
  'Nation Media Group',
];

const exhibitors = [
  'TechStartup Inc.',
  'EduTech Solutions',
  'AI Innovate',
  'GreenTech Labs',
  'DataDriven Co.',
  'FutureEd Ventures',
  'SmartCampus',
  'Innov8 Tech',
  'CodeCrafters',
  'NextGen Analytics',
];

const Index = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverModal, setHoverModal] = useState({
    isVisible: false,
    speakerName: '',
    speakerImage: '',
    position: { x: 0, y: 0 },
  });

  const handleSpeakerClick = (speaker) => {
    setSelectedSpeaker(speaker);
    setIsModalOpen(true);
  };

  const handleSpeakerHover = (speakerName, event) => {
    const speaker = speakers.find((s) => s.name === speakerName);
    if (speaker) {
      setHoverModal({
        isVisible: true,
        speakerName: speaker.name,
        speakerImage: speaker.image,
        position: { x: event.clientX, y: event.clientY },
      });
    }
  };

  const handleSpeakerLeave = () => {
    setHoverModal((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="fade-in-up">
            {/* <Badge className="bg-accent text-accent-foreground mb-6 text-lg px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              KCA University Presents
            </Badge> */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
              Innovation Week 2025
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8 text-accent font-semibold">
              "Empowering Tomorrow's Leaders Through Innovation"
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-10 text-lg">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                <span>October 15-17, 2024</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                <span>KCA University Main Campus</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Hash className="w-5 h-5 text-accent" />
                <span>#KCAInnovation2025</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero bg-[var(--primary)] text-lg px-8 py-4">
                <Users className="w-5 h-5 mr-2" />
                Register Now
              </Button>
              <Button size="lg" variant="outline" className="btn-hero-secondary text-lg px-8 py-4 border-white text-black hover:bg-accent hover:text-accent-foreground">
                <ExternalLink className="w-5 h-5 mr-2" />
                Sponsor Our Event
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="bg-accent text-accent-foreground p-4 font-xl w-[50%] font-bold mb-4">
                Objectives
              </Badge>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  The KCA Innovation Week 2024 aims to foster a culture of creativity, entrepreneurship, and
                  technological advancement among students, faculty, and industry professionals.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-3"></div>
                    <p>Inspire the next generation of innovators and entrepreneurs</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-3"></div>
                    <p>Bridge the gap between academia and industry through practical workshops</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-3"></div>
                    <p>Showcase cutting-edge research and innovative student projects</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-3"></div>
                    <p>Create meaningful networking opportunities for future collaborations</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={objectivesImage}
                alt="Innovation Objectives"
                className="w-full h-96 object-cover rounded-lg shadow-[var(--shadow-primary)] card-hover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-accent text-accent-foreground mb-4">Event Impact</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Join Our Growing Community</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Be part of a vibrant gathering of innovators, professionals, and students driving the future of
              technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="text-center p-6 card-hover">
              <h3 className="text-3xl font-bold text-primary">500+</h3>
              <p className="text-lg text-muted-foreground">Students</p>
            </Card>
            <Card className="text-center p-6 card-hover">
              <h3 className="text-3xl font-bold text-primary">200+</h3>
              <p className="text-lg text-muted-foreground">Industry Professionals</p>
            </Card>
            <Card className="text-center p-6 card-hover">
              <h3 className="text-3xl font-bold text-primary">10+</h3>
              <p className="text-lg text-muted-foreground">Speakers</p>
            </Card>
            <Card className="text-center p-6 card-hover">
              <h3 className="text-3xl font-bold text-primary">20+</h3>
              <p className="text-lg text-muted-foreground">Exhibitors</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Keynote Speaker Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-primary text-primary-foreground mb-4">Keynote Speaker</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Opening Keynote</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join us for an inspiring opening address that will set the tone for three days of innovation
              and discovery.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="card-hover border-primary/20 bg-gradient-to-br from-background to-muted/50">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <img
                      src={keynoteSpeaker}
                      alt="Dr. Sarah Tech"
                      className="w-48 h-48 rounded-lg object-cover border-4 border-primary/20 shadow-[var(--shadow-primary)]"
                    />
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-3xl font-bold gradient-text mb-2">Dr. Sarah Tech</h3>
                    <p className="text-xl text-primary mb-2">Chief Innovation Officer</p>
                    <p className="text-lg text-muted-foreground mb-4">TechCorp Global</p>
                    <div className="mb-6">
                      <Badge variant="secondary" className="mr-2 mb-2">
                        Digital Transformation
                      </Badge>
                      <Badge variant="secondary" className="mr-2 mb-2">
                        AI & Ethics
                      </Badge>
                      <Badge variant="secondary" className="mr-2 mb-2">
                        Innovation Strategy
                      </Badge>
                    </div>
                    <Button className="btn-hero" onClick={() => handleSpeakerClick(speakers[0])}>
                      View Full Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-accent text-accent-foreground mb-4">Event Schedule</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Three Days of Innovation</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive schedule filled with keynotes, workshops, and networking
              opportunities.
            </p>
          </div>

          <Tabs defaultValue="day1" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="day1" className="text-lg py-3">
                Day 1 - Oct 15
              </TabsTrigger>
              <TabsTrigger value="day2" className="text-lg py-3">
                Day 2 - Oct 16
              </TabsTrigger>
              <TabsTrigger value="day3" className="text-lg py-3">
                Day 3 - Oct 17
              </TabsTrigger>
            </TabsList>

            {Object.entries(scheduleData).map(([day, data]) => (
              <TabsContent key={day} value={day}>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-primary to-primary-glow text-white p-6">
                      <h3 className="text-2xl font-bold">{data.date}</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left p-4 font-semibold">Time</th>
                            <th className="text-left p-4 font-semibold">Theme & Speaker</th>
                            <th className="text-left p-4 font-semibold">Venue</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.events.map((event, index) => (
                            <tr
                              key={index}
                              className={`border-b border-border hover:bg-muted/30 transition-colors ${
                                event.breakoutSessions
                                  ? index % 2 === 0
                                    ? 'bg-gray-100'
                                    : 'bg-blue-100'
                                  : ''
                              }`}
                            >
                              <td className="p-4 font-medium text-primary">{event.time}</td>
                              <td className="p-4">
                                {event.breakoutSessions ? (
                                  <div className="space-y-4">
                                    {event.breakoutSessions.map((session, idx) => (
                                      <div key={idx}>
                                        <div className="font-semibold mb-1">
                                          {session.room}: {session.theme}
                                        </div>
                                        {session.speaker && (
                                          <div
                                            className="text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                                            onMouseEnter={(e) => handleSpeakerHover(session.speaker, e)}
                                            onMouseLeave={handleSpeakerLeave}
                                          >
                                            Speaker: {session.speaker}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div>
                                    <div className="font-semibold mb-1">{event.theme}</div>
                                    {event.speaker && (
                                      <div
                                        className="text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                                        onMouseEnter={(e) => handleSpeakerHover(event.speaker, e)}
                                        onMouseLeave={handleSpeakerLeave}
                                      >
                                        Speaker: {event.speaker}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </td>
                              <td className="p-4">
                                {event.breakoutSessions ? (
                                  <div className="space-y-4">
                                    {event.breakoutSessions.map((session, idx) => (
                                      <div key={idx} className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-accent" />
                                        <Badge className="bg-accent text-accent-foreground">
                                          {session.room}
                                        </Badge>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-accent" />
                                    <Badge className="bg-accent text-accent-foreground">
                                      {event.venue || 'Main Hall'}
                                    </Badge>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-primary text-primary-foreground mb-4">Our Speakers</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Industry Leaders & Innovators
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn from distinguished speakers who are shaping the future of technology and
              innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {speakers.map((speaker) => (
              <Card key={speaker.id} className="speaker-card group" onClick={() => handleSpeakerClick(speaker)}>
                <CardContent className="p-6">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-primary/20 object-cover"
                  />
                  <h3 className="text-lg font-bold gradient-text mb-2">{speaker.name}</h3>
                  <p className="text-sm text-primary mb-1">{speaker.designation}</p>
                  <p className="text-sm text-muted-foreground mb-3">{speaker.company}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {speaker.expertise.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-primary text-primary-foreground mb-4">Our Partners</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Trusted Collaborators</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're proud to partner with leading organizations driving innovation across various
              industries.
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-8 scrollbar-hide">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-background border border-border rounded-lg p-6 shadow-sm hover:shadow-[var(--shadow-primary)] transition-all duration-300 min-w-[200px]"
                >
                  <div className="text-center font-semibold text-foreground">{partner}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitors Section */}
      <section id="exhibitors" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-accent text-accent-foreground mb-4">Our Exhibitors</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Showcasing Innovation</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover cutting-edge technologies and solutions from our exhibitors at the Innovation
              Expo.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {exhibitors.map((exhibitor, index) => (
              <div
                key={index}
                className="bg-background border border-border rounded-lg p-6 shadow-sm hover:shadow-[var(--shadow-primary)] transition-all duration-300"
              >
                <div className="text-center font-semibold text-foreground">{exhibitor}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Highlights Section */}
      <section id="event-highlights" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-accent text-accent-foreground mb-4">Memories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Event Highlights</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Relive the excitement from our previous innovation weeks and see what makes our events
              special.
            </p>
          </div>

          <Tabs defaultValue="photos" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="photos" className="text-lg py-3">
                Photo Gallery
              </TabsTrigger>
              <TabsTrigger value="social" className="text-lg py-3">
                Social Media
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photos">
              <div className="grid md:grid-cols-2 gap-6">
                <img
                  src={eventHighlights}
                  alt="Event Highlights"
                  className="w-full h-64 object-cover rounded-lg shadow-[var(--shadow-primary)] card-hover"
                />
                <img
                  src={objectivesImage}
                  alt="Innovation Activities"
                  className="w-full h-64 object-cover rounded-lg shadow-[var(--shadow-primary)] card-hover"
                />
                <img
                  src={keynoteSpeaker}
                  alt="Speaker Session"
                  className="w-full h-64 object-cover rounded-lg shadow-[var(--shadow-primary)] card-hover"
                />
                <img
                  src={heroBg}
                  alt="Networking Session"
                  className="w-full h-64 object-cover rounded-lg shadow-[var(--shadow-primary)] card-hover"
                />
              </div>
            </TabsContent>

            <TabsContent value="social">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="space-y-3">
                      <a
                        href="#"
                        className="block text-primary hover:text-primary-glow transition-colors"
                      >
                        @KCAUniversity #KCAInnovation2024
                      </a>
                      <a
                        href="#"
                        className="block text-primary hover:text-primary-glow transition-colors"
                      >
                        LinkedIn: KCA University Innovation
                      </a>
                      <a
                        href="#"
                        className="block text-primary hover:text-primary-glow transition-colors"
                      >
                        Instagram: @kca_innovation
                      </a>
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-4">Share Your Experience</h3>
                    <p className="text-muted-foreground mb-4">
                      Use our official hashtag to share your innovation week journey!
                    </p>
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white text-lg px-4 py-2">
                      #KCAInnovation2024
                    </Badge>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-accent text-accent-foreground mb-4">Our Venue</Badge>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Visit KCA University</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join us at KCA University Main Campus in Nairobi, Kenya for Innovation Week 2025.
            </p>
          </div>
          <Card className="max-w-4xl mx-auto shadow-[var(--shadow-primary)] card-hover">
            <CardContent className="p-0">
              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.863617039114!2d36.8568777737273!3d-1.2534411355885007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17eb1d447363%3A0x17a2d29bdcf01fda!2sKCA%20University!5e0!3m2!1sen!2ske!4v1754484312736!5m2!1sen!2ske" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.863617039114!2d36.8568777737273!3d-1.2534411355885007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17eb1d447363%3A0x17a2d29bdcf01fda!2sKCA%20University!5e0!3m2!1sen!2ske!4v1754484312736!5m2!1sen!2ske"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KCA University Location"
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Innovate?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us for three unforgettable days of learning, networking, and innovation at KCA
            University.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              <Users className="w-5 h-5 mr-2" />
              Register for Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-white text-black hover:bg-accent hover:text-accent-foreground"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* Speaker Modal */}
      <SpeakerModal speaker={selectedSpeaker} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Hover Modal */}
      <SpeakerHoverModal
        speakerName={hoverModal.speakerName}
        speakerImage={hoverModal.speakerImage}
        isVisible={hoverModal.isVisible}
        position={hoverModal.position}
      />
    </div>
  );
};

export default Index;