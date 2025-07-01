import React, { useState, useRef, useEffect } from 'react';
import { Send, Edit3, Eye, MessageCircle, Heart, Lightbulb, Copy, Download } from 'lucide-react';

const TheatreEmailComposer = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [playTitle, setPlayTitle] = useState('');
  const [customDetails, setCustomDetails] = useState('');
  const [toneLevel, setToneLevel] = useState(2);
  const [showEmotionalHighlights, setShowEmotionalHighlights] = useState(true);
  const [emotionalInsights, setEmotionalInsights] = useState([]);
  const textareaRef = useRef(null);

  const templates = {
    'kind_pass': {
      title: 'Kind Script Pass',
      template: `Dear {recipientName},

Thank you for sharing {playTitle} with us. I had the chance to read through the script and found {customDetails} compelling elements in your work. The writing shows real talent and thoughtful character development.

While this particular piece doesn't align with our current programming priorities, I genuinely appreciate the opportunity to experience your storytelling. Your voice as a playwright comes through clearly, and I'm eager to see how your work continues to evolve.

I hope you'll keep us in mind for future projects. We're always excited to discover new voices and stories that resonate with our mission.

Wishing you all the best with {playTitle} and your continued creative journey.

Warmly,`
    },
    'coverage_decline': {
      title: 'Coverage Invitation Decline',
      template: `Dear {recipientName},

Thank you for thinking of me for coverage on {playTitle}. I'm truly flattered that you'd consider my perspective valuable for this project.

Unfortunately, my current commitments won't allow me to give this script the thoughtful attention it deserves within your timeline. {customDetails}

I appreciate you reaching out and hope we can collaborate on something in the future when schedules align better.

Best wishes with the coverage process,`
    },
    'nice_meeting': {
      title: 'Nice Meeting You Follow-up',
      template: `Dear {recipientName},

It was such a pleasure meeting you {customDetails}. I really enjoyed our conversation about {playTitle} and your thoughtful approach to storytelling.

Your passion for the work comes through so clearly, and I left our meeting feeling energized about the projects you're developing. The theatrical community is enriched by voices like yours.

I hope our paths cross again soon, and please don't hesitate to keep me posted on how things develop with your current projects.

Looking forward to staying connected,`
    },
    'reading_setup': {
      title: 'Reading Setup Invitation',
      template: `Dear {recipientName},

I hope this finds you well. After reading {playTitle}, I'm excited about the possibility of organizing a reading to hear the work brought to life by actors.

{customDetails} The script has elements that I believe would really benefit from being heard, and I'd love to explore this next step with you.

Would you be interested in discussing the logistics? I'm thinking we could aim for {customDetails} and I have some thoughts about potential casting that might serve the material well.

Looking forward to hearing your thoughts and hopefully moving forward together.

Best,`
    },
    'agent_inquiry': {
      title: 'Agent Script Inquiry',
      template: `Dear {recipientName},

I hope you're doing well. I wanted to reach out regarding {playTitle} by {customDetails}. We've been following their work with great interest.

Could you share any information about the script's current status and any future production plans? {customDetails} We'd love to understand the timeline and explore potential opportunities for collaboration.

I'd be happy to discuss this further at your convenience. Thank you for always being such a wonderful advocate for your clients' work.

Looking forward to hearing from you,`
    },
    'commission_offer': {
      title: 'Commission Offer',
      template: `Dear {recipientName},

I hope this message finds you in good creative spirits. After our recent conversations and having experienced your work, particularly {playTitle}, I'm excited to extend a commission opportunity.

{customDetails} Your distinctive voice and theatrical instincts align beautifully with our artistic vision, and we'd be thrilled to support the development of a new work.

The commission would involve {customDetails}, and we're flexible about timeline and development process to best serve your creative needs.

I'd love to discuss this opportunity further. When might be a good time for a conversation?

With admiration for your work,`
    },
    'consultant_thanks': {
      title: 'Consultant Appreciation',
      template: `Dear {recipientName},

I wanted to take a moment to thank you for your thoughtful suggestion about {playTitle}. Your insight about {customDetails} was spot-on and really helped clarify our approach.

Your expertise and generous sharing of knowledge continues to be invaluable to our work. Having consultants like you makes such a difference in how we evaluate and develop projects.

I'm grateful for your continued collaboration and look forward to our next opportunity to work together.

With appreciation,`
    },
    'script_acknowledgment': {
      title: 'Script Acknowledgment',
      template: `Dear {recipientName},

Thank you for sharing {playTitle} with us. I'm grateful for the opportunity to read your work and appreciate you thinking of our theatre.

The script is now in our review process, and {customDetails} I'll be in touch as soon as we've had the chance to give it the thoughtful consideration it deserves.

In the meantime, please know how much we value writers who share their work with us. The creative courage it takes to put stories into the world is something we never take for granted.

Looking forward to being in touch soon,`
    },
    'post_reading_followup': {
      title: 'Post-Reading Follow-Up - Next Steps',
      template: `Dear {recipientName},

I hope this finds you well. I wanted to reach out while the energy from our reading of {playTitle} is still fresh in my mind – what an incredible evening that was.

The response from everyone in the room was genuinely electric. {customDetails} The way your characters breathed life into our space and the conversations that continued long after we finished tell me everything I need to know about the power of this work.

I'd love to sit down with you soon to discuss where we might take this next. I have some thoughts about potential development opportunities and would be eager to hear your vision for the play's future.

Would you have time for coffee or a call in the coming week? I'm flexible with timing and happy to work around your schedule.

Thank you again for sharing your beautiful work with us. I'm excited about the possibility of continuing this journey together.

Warmest regards,`
    },
    'donor_thanks': {
      title: 'Donor Appreciation for Reading Support',
      template: `Dear {recipientName},

I hope this note finds you well. I wanted to reach out personally to thank you for your generous support of our recent reading of {playTitle}.

{customDetails} Your belief in the power of new work development makes evenings like this possible, and the impact ripples through our entire artistic community. The playwright was deeply moved to know that supporters like you champion emerging voices.

These readings are where magic happens – where new stories find their breath and where artists discover what's possible. Your investment in this process is an investment in the future of theatre itself.

We're grateful to have you as part of our artistic family and look forward to sharing more exciting developments with you soon.

With heartfelt appreciation,`
    }
  };

  const emotionalLanguagePatterns = [
    {
      pattern: /\b(grateful|appreciate|thankful|thank you)\b/gi,
      type: 'gratitude',
      reason: 'Gratitude creates warmth and acknowledges the recipient\'s contribution',
      color: 'bg-green-100 text-green-800'
    },
    {
      pattern: /\b(excited|thrilled|delighted|energized|passionate)\b/gi,
      type: 'enthusiasm',
      reason: 'Enthusiasm conveys genuine interest and positive energy',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      pattern: /\b(hope|looking forward|eager|anticipate)\b/gi,
      type: 'optimism',
      reason: 'Forward-looking language maintains relationship momentum',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      pattern: /\b(thoughtful|careful|considerate|meaningful|genuine)\b/gi,
      type: 'respect',
      reason: 'Shows deep respect for their craft and creative process',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      pattern: /\b(wonderful|beautiful|remarkable|impressive|compelling)\b/gi,
      type: 'admiration',
      reason: 'Specific praise builds confidence and reinforces artistic value',
      color: 'bg-pink-100 text-pink-800'
    },
    {
      pattern: /\b(support|collaborate|partnership|together|connection)\b/gi,
      type: 'partnership',
      reason: 'Emphasizes ongoing relationship rather than transactional interaction',
      color: 'bg-indigo-100 text-indigo-800'
    }
  ];

  const toneAdjustments = [
    'Very Formal',
    'Professional',
    'Warm Professional',
    'Personal & Warm',
    'Very Personal'
  ];

  // Enhanced tone adjustment function
  const applyToneAdjustments = (content, level) => {
    let adjustedContent = content;

    if (level === 0) {
      // Very Formal
      adjustedContent = adjustedContent.replace(/Warmly,/g, 'Sincerely,');
      adjustedContent = adjustedContent.replace(/Best,/g, 'Regards,');
      adjustedContent = adjustedContent.replace(/With warm regards,/g, 'Respectfully,');
      adjustedContent = adjustedContent.replace(/I'm excited/g, 'I would be pleased');
      adjustedContent = adjustedContent.replace(/I'd love to/g, 'I would be happy to');
    } else if (level === 1) {
      // Professional
      adjustedContent = adjustedContent.replace(/Warmly,/g, 'Best regards,');
      adjustedContent = adjustedContent.replace(/I'm excited/g, 'I am pleased');
    } else if (level >= 3) {
      // Personal & Warm / Very Personal
      adjustedContent = adjustedContent.replace(/Sincerely,/g, 'Warmly,');
      adjustedContent = adjustedContent.replace(/Regards,/g, 'With warm regards,');
      adjustedContent = adjustedContent.replace(/Best regards,/g, 'Warmly,');
      
      if (level === 4) {
        // Very Personal
        adjustedContent = adjustedContent.replace(/I would be pleased/g, 'I\'m genuinely excited');
        adjustedContent = adjustedContent.replace(/I am pleased/g, 'I\'m thrilled');
      }
    }

    return adjustedContent;
  };

  useEffect(() => {
    if (selectedTemplate && templates[selectedTemplate]) {
      let content = templates[selectedTemplate].template;
      content = content.replace(/{recipientName}/g, recipientName || '[Recipient Name]');
      content = content.replace(/{playTitle}/g, playTitle || '[Play Title]');
      content = content.replace(/{customDetails}/g, customDetails || '[Custom Details] ');
      
      // Apply tone adjustments
      content = applyToneAdjustments(content, toneLevel);
      
      setEmailContent(content);
    }
  }, [selectedTemplate, recipientName, playTitle, customDetails, toneLevel]);

  useEffect(() => {
    if (emailContent && showEmotionalHighlights) {
      const insights = [];
      emotionalLanguagePatterns.forEach(pattern => {
        const matches = emailContent.match(pattern.pattern);
        if (matches) {
          insights.push({
            type: pattern.type,
            count: matches.length,
            words: [...new Set(matches.map(m => m.toLowerCase()))],
            reason: pattern.reason,
            color: pattern.color
          });
        }
      });
      setEmotionalInsights(insights);
    }
  }, [emailContent, showEmotionalHighlights]);

  const highlightEmotionalLanguage = (text) => {
    if (!showEmotionalHighlights) return text;
    
    let highlightedText = text;
    emotionalLanguagePatterns.forEach(pattern => {
      highlightedText = highlightedText.replace(pattern.pattern, (match) => 
        `<span class="px-1 rounded ${pattern.color} font-medium">${match}</span>`
      );
    });
    return highlightedText;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailContent);
    alert('Email copied to clipboard!');
  };

  const downloadEmail = () => {
    const element = document.createElement('a');
    const file = new Blob([emailContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${selectedTemplate}_email.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle className="text-blue-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-800">Theatre Email Composer & Editor</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Type</label>
              <select 
                value={selectedTemplate} 
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select email type...</option>
                {Object.entries(templates).map(([key, template]) => (
                  <option key={key} value={key}>{template.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Enter recipient's name"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Play Title</label>
              <input
                type="text"
                value={playTitle}
                onChange={(e) => setPlayTitle(e.target.value)}
                placeholder="Enter play title"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom Details</label>
              <textarea
                value={customDetails}
                onChange={(e) => setCustomDetails(e.target.value)}
                placeholder="Add specific details, context, or personal touches"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tone Level</label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={toneLevel}
                  onChange={(e) => setToneLevel(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 text-center">
                  {toneAdjustments[toneLevel]}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="emotional-highlights"
                checked={showEmotionalHighlights}
                onChange={(e) => setShowEmotionalHighlights(e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <label htmlFor="emotional-highlights" className="text-sm font-medium text-gray-700">
                Show Emotional Language Highlights
              </label>
            </div>

            <div className="border-t pt-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="text-blue-600" size={16} />
                  <span className="text-sm font-medium text-blue-800">Pro Tip</span>
                </div>
                <p className="text-xs text-blue-700">
                  For AI-powered email improvements and custom template creation, use this tool within Claude.ai where advanced features are available.
                </p>
              </div>
            </div>
          </div>

          {/* Middle Panel - Email Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Email Content</h3>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                >
                  <Copy size={14} />
                  Copy
                </button>
                <button
                  onClick={downloadEmail}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
            
            <div className="border border-gray-300 rounded-md p-4 min-h-96 bg-white">
              {showEmotionalHighlights ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: highlightEmotionalLanguage(emailContent.replace(/\n/g, '<br>')) }}
                  className="whitespace-pre-wrap font-mono text-sm leading-relaxed"
                />
              ) : (
                <textarea
                  ref={textareaRef}
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className="w-full h-96 p-0 border-none resize-none focus:outline-none font-mono text-sm leading-relaxed"
                  placeholder="Select an email type to begin..."
                />
              )}
            </div>
          </div>

          {/* Right Panel - Emotional Language Analysis */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" size={20} />
              <h3 className="text-lg font-semibold text-gray-800">Emotional Language Analysis</h3>
            </div>
            
            {emotionalInsights.length > 0 ? (
              <div className="space-y-4">
                {emotionalInsights.map((insight, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${insight.color}`}>
                        {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                      </span>
                      <span className="text-sm text-gray-600">({insight.count} instances)</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{insight.reason}</p>
                    <div className="flex flex-wrap gap-1">
                      {insight.words.map((word, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white rounded text-xs border">
                          "{word}"
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="text-blue-600" size={16} />
                    <span className="text-sm font-medium text-blue-800">Connection Score</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {Math.min(100, Math.round((emotionalInsights.reduce((sum, insight) => sum + insight.count, 0) / emailContent.split(' ').length) * 1000))}%
                  </div>
                  <p className="text-xs text-blue-700">
                    This email uses emotional language effectively to build connection and maintain relationships.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Heart size={32} className="mx-auto mb-2 opacity-50" />
                <p>Select an email type to see emotional language analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheatreEmailComposer;
