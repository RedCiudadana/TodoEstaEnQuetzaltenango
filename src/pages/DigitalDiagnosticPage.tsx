import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Smartphone, 
  Globe, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  MessageSquare,
  CreditCard,
  Search,
  Target,
  Zap,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';

interface Question {
  id: number;
  text: string;
  icon: React.ReactNode;
  category: 'presence' | 'marketing' | 'sales' | 'analytics';
}

interface AssessmentResult {
  score: number;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  categoryScores: {
    presence: number;
    marketing: number;
    sales: number;
    analytics: number;
  };
  recommendations: string[];
  courses: Course[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  url: string;
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "¿Tu negocio tiene una página web o sitio web oficial?",
    icon: <Globe className="h-5 w-5" />,
    category: 'presence'
  },
  {
    id: 2,
    text: "¿Utilizas redes sociales (Facebook, Instagram, WhatsApp Business) para promocionar tu negocio?",
    icon: <MessageSquare className="h-5 w-5" />,
    category: 'presence'
  },
  {
    id: 3,
    text: "¿Tienes presencia en Google My Business o Google Maps?",
    icon: <Search className="h-5 w-5" />,
    category: 'presence'
  },
  {
    id: 4,
    text: "¿Realizas publicidad digital pagada (Facebook Ads, Google Ads)?",
    icon: <Target className="h-5 w-5" />,
    category: 'marketing'
  },
  {
    id: 5,
    text: "¿Envías newsletters o correos electrónicos promocionales a tus clientes?",
    icon: <Users className="h-5 w-5" />,
    category: 'marketing'
  },
  {
    id: 6,
    text: "¿Vendes productos o servicios en línea (e-commerce, catálogos digitales)?",
    icon: <ShoppingCart className="h-5 w-5" />,
    category: 'sales'
  },
  {
    id: 7,
    text: "¿Aceptas pagos digitales (transferencias, tarjetas, billeteras digitales)?",
    icon: <CreditCard className="h-5 w-5" />,
    category: 'sales'
  },
  {
    id: 8,
    text: "¿Utilizas herramientas para medir el rendimiento de tu presencia digital?",
    icon: <BarChart3 className="h-5 w-5" />,
    category: 'analytics'
  },
  {
    id: 9,
    text: "¿Respondes activamente a comentarios y mensajes en redes sociales?",
    icon: <MessageSquare className="h-5 w-5" />,
    category: 'marketing'
  },
  {
    id: 10,
    text: "¿Utilizas herramientas digitales para gestionar tu inventario o clientes?",
    icon: <Smartphone className="h-5 w-5" />,
    category: 'analytics'
  }
];

const courses: Course[] = [
  {
    id: 'digital-presence',
    title: 'Presencia Digital para Negocios',
    description: 'Aprende a crear y gestionar la presencia digital de tu negocio en redes sociales y web.',
    duration: '4 semanas',
    level: 'Básico',
    url: 'https://conectafuturo.redciudadana.org/cursos/presencia-digital',
    category: 'presence'
  },
  {
    id: 'social-media-marketing',
    title: 'Marketing en Redes Sociales',
    description: 'Domina las estrategias de marketing digital para hacer crecer tu negocio en redes sociales.',
    duration: '6 semanas',
    level: 'Intermedio',
    url: 'https://conectafuturo.redciudadana.org/cursos/marketing-redes-sociales',
    category: 'marketing'
  },
  {
    id: 'ecommerce-basics',
    title: 'Fundamentos del E-commerce',
    description: 'Inicia tu tienda en línea y aprende a vender productos digitalmente.',
    duration: '5 semanas',
    level: 'Intermedio',
    url: 'https://conectafuturo.redciudadana.org/cursos/ecommerce-basico',
    category: 'sales'
  },
  {
    id: 'digital-analytics',
    title: 'Analítica Digital para Negocios',
    description: 'Aprende a medir y analizar el rendimiento de tu presencia digital.',
    duration: '3 semanas',
    level: 'Avanzado',
    url: 'https://conectafuturo.redciudadana.org/cursos/analitica-digital',
    category: 'analytics'
  },
  {
    id: 'digital-payments',
    title: 'Pagos Digitales y Fintech',
    description: 'Implementa soluciones de pago digital en tu negocio.',
    duration: '2 semanas',
    level: 'Intermedio',
    url: 'https://conectafuturo.redciudadana.org/cursos/pagos-digitales',
    category: 'sales'
  },
  {
    id: 'google-business',
    title: 'Google My Business y SEO Local',
    description: 'Optimiza tu presencia en Google para atraer más clientes locales.',
    duration: '3 semanas',
    level: 'Básico',
    url: 'https://conectafuturo.redciudadana.org/cursos/google-business',
    category: 'presence'
  }
];

const DigitalDiagnosticPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>({});
  const [showResults, setShowResults] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const navigate = useNavigate();

  const handleAnswer = (answer: boolean) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: { [key: number]: boolean }) => {
    const categoryScores = {
      presence: 0,
      marketing: 0,
      sales: 0,
      analytics: 0
    };

    const categoryCounts = {
      presence: 0,
      marketing: 0,
      sales: 0,
      analytics: 0
    };

    questions.forEach(question => {
      categoryCounts[question.category]++;
      if (finalAnswers[question.id]) {
        categoryScores[question.category]++;
      }
    });

    // Calculate percentages
    Object.keys(categoryScores).forEach(category => {
      const cat = category as keyof typeof categoryScores;
      categoryScores[cat] = Math.round((categoryScores[cat] / categoryCounts[cat]) * 100);
    });

    const totalScore = Math.round(
      Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / 4
    );

    let level: 'Básico' | 'Intermedio' | 'Avanzado';
    let recommendations: string[];
    let recommendedCourses: Course[];

    if (totalScore < 40) {
      level = 'Básico';
      recommendations = [
        'Comienza creando perfiles en redes sociales para tu negocio',
        'Registra tu negocio en Google My Business',
        'Considera crear una página web básica o usar plataformas gratuitas',
        'Implementa al menos un método de pago digital'
      ];
      recommendedCourses = courses.filter(course => 
        course.level === 'Básico' || course.category === 'presence'
      );
    } else if (totalScore < 70) {
      level = 'Intermedio';
      recommendations = [
        'Mejora tu estrategia de marketing en redes sociales',
        'Implementa herramientas de análisis para medir tu rendimiento',
        'Considera expandir tus canales de venta en línea',
        'Automatiza algunos procesos de comunicación con clientes'
      ];
      recommendedCourses = courses.filter(course => 
        course.level === 'Intermedio' || ['marketing', 'sales'].includes(course.category)
      );
    } else {
      level = 'Avanzado';
      recommendations = [
        'Optimiza tus campañas de publicidad digital',
        'Implementa herramientas avanzadas de analítica',
        'Considera estrategias de automatización de marketing',
        'Explora nuevas tecnologías como inteligencia artificial'
      ];
      recommendedCourses = courses.filter(course => 
        course.level === 'Avanzado' || course.category === 'analytics'
      );
    }

    setAssessmentResult({
      score: totalScore,
      level,
      categoryScores,
      recommendations,
      courses: recommendedCourses
    });
    setShowResults(true);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setAssessmentResult(null);
  };

  const getCategoryName = (category: string) => {
    const names = {
      presence: 'Presencia Digital',
      marketing: 'Marketing Digital',
      sales: 'Ventas Digitales',
      analytics: 'Analítica Digital'
    };
    return names[category as keyof typeof names] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      presence: 'bg-blue-500',
      marketing: 'bg-green-500',
      sales: 'bg-purple-500',
      analytics: 'bg-orange-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'Básico': 'text-red-600 bg-red-100',
      'Intermedio': 'text-yellow-600 bg-yellow-100',
      'Avanzado': 'text-green-600 bg-green-100'
    };
    return colors[level as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  if (showResults && assessmentResult) {
    return (
      <>
        <PageHeader
          title="Resultados del Diagnóstico Digital"
          subtitle="Conoce el nivel de madurez digital de tu negocio"
          image="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Overall Score */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full mb-4">
                  <TrendingUp className="h-12 w-12 text-primary-500" />
                </div>
                <h2 className="text-3xl font-heading font-bold text-gray-800 mb-2">
                  Tu Puntuación: {assessmentResult.score}%
                </h2>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getLevelColor(assessmentResult.level)}`}>
                  Nivel {assessmentResult.level}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className="bg-primary-500 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${assessmentResult.score}%` }}
                ></div>
              </div>

              <p className="text-gray-600 max-w-2xl mx-auto">
                {assessmentResult.level === 'Básico' && 
                  'Tu negocio está comenzando su transformación digital. Hay muchas oportunidades para crecer.'}
                {assessmentResult.level === 'Intermedio' && 
                  'Tu negocio tiene una base digital sólida. Es momento de optimizar y expandir.'}
                {assessmentResult.level === 'Avanzado' && 
                  'Tu negocio tiene una excelente madurez digital. Continúa innovando y liderando.'}
              </p>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-6">
                Desglose por Categorías
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(assessmentResult.categoryScores).map(([category, score]) => (
                  <div key={category} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-800">
                        {getCategoryName(category)}
                      </h4>
                      <span className="text-lg font-bold text-gray-800">
                        {score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${getCategoryColor(category)}`}
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-6 flex items-center">
                <AlertCircle className="h-5 w-5 text-primary-500 mr-2" />
                Recomendaciones Personalizadas
              </h3>

              <div className="space-y-3">
                {assessmentResult.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Courses */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-heading font-semibold text-gray-800 mb-6 flex items-center">
                <Zap className="h-5 w-5 text-primary-500 mr-2" />
                Cursos Recomendados de Conecta Futuro
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assessmentResult.courses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-gray-800">{course.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{course.duration}</span>
                      <a 
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        Ver Curso
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <a 
                  href="https://conectafuturo.redciudadana.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Ver Todos los Cursos en Conecta Futuro
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={resetAssessment}
                className="btn btn-outline"
              >
                Realizar Diagnóstico Nuevamente
              </button>
              <button 
                onClick={() => navigate('/business/register')}
                className="btn btn-primary"
              >
                Registrar mi Negocio
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Diagnóstico de Madurez Digital"
        subtitle="Evalúa el nivel digital de tu negocio en 10 preguntas"
        image="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                {questions[currentQuestion].icon}
              </div>
              <h2 className="text-xl font-heading font-semibold text-gray-800 mb-2">
                {questions[currentQuestion].text}
              </h2>
              <p className="text-gray-600">
                Selecciona la opción que mejor describa tu situación actual
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 flex items-center justify-center"
              >
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="font-medium text-gray-800">Sí</span>
              </button>

              <button
                onClick={() => handleAnswer(false)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all duration-200 flex items-center justify-center"
              >
                <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                <span className="font-medium text-gray-800">No</span>
              </button>
            </div>

            {/* Navigation */}
            {currentQuestion > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  ← Pregunta Anterior
                </button>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-medium text-blue-800 mb-2">
              ¿Qué es la Madurez Digital?
            </h3>
            <p className="text-blue-700 text-sm">
              La madurez digital mide qué tan bien tu negocio utiliza las tecnologías digitales 
              para mejorar sus operaciones, llegar a más clientes y aumentar sus ventas. 
              Este diagnóstico te ayudará a identificar oportunidades de crecimiento.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalDiagnosticPage;