import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSubmitQuizResults } from '../hooks/useQueries';
import { toast } from 'sonner';

interface Question {
  id: number;
  question: string;
  options: Array<{ text: string; stream: 'Science' | 'Commerce' | 'Arts' }>;
}

export default function StreamSelector() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const submitQuizResults = useSubmitQuizResults();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions: Question[] = [
    {
      id: 1,
      question: 'Which subject do you enjoy the most?',
      options: [
        { text: 'Mathematics and Physics', stream: 'Science' },
        { text: 'Accounts and Economics', stream: 'Commerce' },
        { text: 'History and Literature', stream: 'Arts' },
      ],
    },
    {
      id: 2,
      question: 'What type of career interests you?',
      options: [
        { text: 'Engineering, Medicine, or Research', stream: 'Science' },
        { text: 'Business, Finance, or Management', stream: 'Commerce' },
        { text: 'Creative Arts, Law, or Social Sciences', stream: 'Arts' },
      ],
    },
    {
      id: 3,
      question: 'How do you prefer to solve problems?',
      options: [
        { text: 'Using logic and experiments', stream: 'Science' },
        { text: 'Analyzing data and numbers', stream: 'Commerce' },
        { text: 'Creative thinking and expression', stream: 'Arts' },
      ],
    },
    {
      id: 4,
      question: 'What kind of activities do you enjoy?',
      options: [
        { text: 'Lab experiments and coding', stream: 'Science' },
        { text: 'Managing budgets and planning', stream: 'Commerce' },
        { text: 'Writing, painting, or performing', stream: 'Arts' },
      ],
    },
    {
      id: 5,
      question: 'Which skill would you like to develop?',
      options: [
        { text: 'Technical and analytical skills', stream: 'Science' },
        { text: 'Business and financial skills', stream: 'Commerce' },
        { text: 'Communication and creative skills', stream: 'Arts' },
      ],
    },
  ];

  const handleAnswer = (stream: string) => {
    setAnswers({ ...answers, [currentQuestion]: stream });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = async () => {
    const streamCounts: Record<string, number> = { Science: 0, Commerce: 0, Arts: 0 };
    Object.values(answers).forEach((stream) => {
      streamCounts[stream] = (streamCounts[stream] || 0) + 1;
    });

    const suggestedStream = Object.entries(streamCounts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    const completionPercentage = Math.round((Object.keys(answers).length / questions.length) * 100);

    // Save results if user is authenticated
    if (identity) {
      try {
        await submitQuizResults.mutateAsync({
          selectedStreams: [suggestedStream],
          completionPercentage,
        });
        toast.success('Quiz results saved successfully!');
      } catch (error) {
        console.error('Failed to save quiz results:', error);
        toast.error('Failed to save results, but you can still view them');
      }
    }

    navigate({ to: '/stream-result', search: { stream: suggestedStream } });
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const hasAnswer = answers[currentQuestion] !== undefined;

  return (
    <div className="py-12 sm:py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Stream Selector Quiz
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground px-4">
              Answer these questions to find your ideal stream
            </p>
            {!identity && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 px-4">
                💡 <a href="/login" className="text-primary hover:underline">Log in</a> to save your results
              </p>
            )}
          </div>

          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2 px-1">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full gradient-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft-lg animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">{currentQ.question}</h2>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.stream)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    answers[currentQuestion] === option.stream
                      ? 'border-primary bg-primary/5 shadow-soft'
                      : 'border-border hover:border-primary/50 hover:bg-accent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        answers[currentQuestion] === option.stream
                          ? 'border-primary'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {answers[currentQuestion] === option.stream && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="font-medium text-sm sm:text-base">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-lg border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[44px] order-2 sm:order-1"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!hasAnswer || submitQuizResults.isPending}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:shadow-soft disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[44px] order-1 sm:order-2"
              >
                {submitQuizResults.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
