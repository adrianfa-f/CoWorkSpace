const Features = () => {
    const features = [
        { title: 'Tiempo real', desc: 'Cambios instantáneos para todos los usuarios' },
        { title: 'Offline', desc: 'Sigue editando sin conexión' },
        { title: 'Seguro', desc: 'Encriptación de extremo a extremo' },
    ];

    return (
        <section className="py-20 bg-gray-800">
            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
                {features.map((feat, idx) => (
                    <div key={idx} className="p-6 bg-gray-700 rounded-lg">
                        <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                        <p className="text-gray-300">{feat.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;