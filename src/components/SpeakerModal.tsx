import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, Calendar, Users } from 'lucide-react';

interface Speaker {
  id: string;
  name: string;
  designation: string;
  company: string;
  bio: string;
  image: string;
  expertise: string[];
  experience: string;
  achievements: string[];
}

interface SpeakerModalProps {
  speaker: Speaker | null;
  isOpen: boolean;
  onClose: () => void;
}

const SpeakerModal = ({ speaker, isOpen, onClose }: SpeakerModalProps) => {
  if (!speaker) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Speaker Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Speaker Header */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-32 h-32 rounded-lg object-cover border-2 border-primary/20"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold gradient-text mb-2">{speaker.name}</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{speaker.designation}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>{speaker.company}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{speaker.experience} of experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expertise */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {speaker.expertise.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Biography</h3>
            <p className="text-muted-foreground leading-relaxed">{speaker.bio}</p>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Key Achievements</h3>
            <ul className="space-y-2">
              {speaker.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></span>
                  <span className="text-muted-foreground">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpeakerModal;