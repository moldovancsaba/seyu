import React from 'react';

const Statistics = ({ content }) => {
  const { title, items, buttons } = content.statistics;

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {items.map((item, index) => (
              <div key={index} className="flex flex-col">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-gray-100 hover:border-primary-500/50 transition-colors h-full">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <div className="text-3xl font-bold text-primary-600">
                      {item.number}
                    </div>
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{item.value}</p>
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
        {buttons && buttons.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {buttons.map((button, index) => (
              <a
                key={index}
                href={button.href}
                className={`rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm ${
                  button.type === 'primary'
                    ? 'bg-primary-600 text-white hover:bg-primary-500'
                    : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                }`}
              >
                {button.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;
