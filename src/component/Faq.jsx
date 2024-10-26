import { useState } from "react";

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const faqs = [
        {
            question: 'What type of bike should I buy?',
            answer:
                'The type of bike you should buy depends on where and how you plan to ride. Mountain bikes are ideal for off-road trails, road bikes are great for paved roads, and hybrid bikes are a mix of both.',
        },
        {
            question: 'How do I maintain my bike?',
            answer:
                'Regular maintenance includes cleaning your bike, lubricating the chain, checking tire pressure, and ensuring your brakes and gears are functioning properly.',
        },
        {
            question: 'What is the correct tire pressure for my bike?',
            answer:
                'The ideal tire pressure varies based on the bike type and tire size. Check the manufacturer’s recommendations on the tire sidewall. Road bikes typically need higher pressure (80-130 psi), while mountain bikes require lower pressure (30-50 psi).',
        },
        {
            question: 'How often should I service my bike?',
            answer:
                'It’s recommended to service your bike at least once a year, depending on usage. Frequent riders or off-road cyclists may need servicing more often, especially after riding in rough conditions.',
        },
        {
            question: 'What size bike is right for me?',
            answer:
                'Bike size is determined by your height and leg length. Visit a bike shop to get a professional fitting, or refer to online sizing guides based on your measurements.',
        },
    ];
    return (
        <section className="py-12 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Bike FAQs</h2>
                <p className="text-lg text-gray-600 mb-8">Your most common bike-related questions answered.</p>

                <div className="text-left space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full p-4 flex justify-between items-center text-left"
                            >
                                <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
                                <span className={`transform font-bold transition-transform ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                                    ⌄
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-max-height duration-500 ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}
                            >
                                <p className="p-4 text-gray-600">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;