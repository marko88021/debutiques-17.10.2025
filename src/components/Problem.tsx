import { useTranslation } from 'react-i18next';
import { Camera, Package, Clock, Eye } from 'lucide-react';

export function Problem() {
  const { t } = useTranslation();

  const challenges = [
    {
      icon: Camera,
      title: t('problem.challenges.expensivePhotoshoots.title'),
      description: t('problem.challenges.expensivePhotoshoots.description')
    },
    {
      icon: Package,
      title: t('problem.challenges.endlessPrototypes.title'),
      description: t('problem.challenges.endlessPrototypes.description')
    },
    {
      icon: Clock,
      title: t('problem.challenges.slowLaunches.title'),
      description: t('problem.challenges.slowLaunches.description')
    },
    {
      icon: Eye,
      title: t('problem.challenges.inconsistentPresentation.title'),
      description: t('problem.challenges.inconsistentPresentation.description')
    }
  ];

  const solutions = [
    {
      title: t('problem.solution.renderingsForAnyFinish.title'),
      description: t('problem.solution.renderingsForAnyFinish.description')
    },
    {
      title: t('problem.solution.featureFocusedAnimations.title'),
      description: t('problem.solution.featureFocusedAnimations.description')
    },
    {
      title: t('problem.solution.360Visuals.title'),
      description: t('problem.solution.360Visuals.description')
    },
    {
      title: t('problem.solution.interiorStaging.title'),
      description: t('problem.solution.interiorStaging.description')
    }
  ];

  return (
    <section id="problem" className="py-16 md:py-24 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Challenges Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 section-heading">
            {t('problem.challenges.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {challenges.map((challenge, index) => {
              const IconComponent = challenge.icon;
              return (
                <div key={index} className="feature-card p-6 rounded-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Solution Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 section-heading">
            {t('problem.solution.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {solutions.map((solution, index) => (
              <div key={index} className="feature-card p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-white">
                  {solution.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}