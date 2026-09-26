import { stats } from '../../data/portfolio';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: displayed } = useAnimatedCounter<HTMLDivElement>(value);

  return (
    <div className="stat-card" ref={ref}>
      <h2>
        {displayed}
        {suffix}
      </h2>
      <p>{label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
