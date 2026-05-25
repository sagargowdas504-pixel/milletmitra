const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "100%", label: "Natural Products" },
  { value: "50+", label: "Products" },
  { value: "2-3 Days", label: "Fast Delivery" },
  { value: "99.8%", label: "5-Star Rating" },
];

const StatsBar = () => {
  return (
    <section className="bg-primary py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="animate-count-up">
              <p className="font-display text-2xl md:text-3xl font-bold text-secondary">
                {stat.value}
              </p>
              <p className="text-primary-foreground/70 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
