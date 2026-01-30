import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Trophy, Target, Users, Calendar, ChevronRight } from "lucide-react";

const milestones = [
  { year: "2022", title: "Team Founded", description: "Zero Strikes was born with a vision to dominate Free Fire esports." },
  { year: "2023", title: "First Major Win", description: "Captured our first regional championship title." },
  { year: "2024", title: "International Debut", description: "Represented our region in the World Championship." },
  { year: "2025", title: "Expansion", description: "Built a state-of-the-art gaming house and expanded our roster." },
];

const achievements = [
  { icon: Trophy, value: "50+", label: "Tournament Wins" },
  { icon: Target, value: "95%", label: "Win Rate" },
  { icon: Users, value: "1M+", label: "Fan Community" },
  { icon: Calendar, value: "3", label: "Years Active" },
];

const TeamPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden hero-bg">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm font-heading text-primary uppercase tracking-wider mb-6">
              About Us
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
              THE <span className="gradient-text">LEGACY</span>
            </h1>
            <p className="text-xl text-muted-foreground font-heading max-w-2xl">
              Zero Strikes is not just a team—it's a movement. We represent the pinnacle 
              of Free Fire competitive gaming, built on skill, strategy, and unwavering determination.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card gaming-border p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <p className="text-4xl font-display font-bold text-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground font-heading uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm font-heading text-primary uppercase tracking-wider mb-4">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              FROM PASSION TO <span className="gradient-text">DOMINANCE</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              What started as a group of passionate gamers has evolved into one of the most 
              feared teams in Free Fire esports. Our journey is defined by countless hours of 
              practice, unwavering dedication, and an insatiable hunger for victory.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} pl-12 md:pl-0`}>
                  <span className="text-primary font-display font-bold text-2xl">
                    {milestone.year}
                  </span>
                  <h3 className="text-xl font-display font-bold text-foreground mt-2">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    {milestone.description}
                  </p>
                </div>
                
                <div className="absolute left-0 md:relative md:left-auto w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                  <ChevronRight className="w-4 h-4 text-primary-foreground" />
                </div>
                
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm font-heading text-primary uppercase tracking-wider mb-4">
              Core Values
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              WHAT DRIVES <span className="gradient-text">US</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Excellence", description: "We strive for perfection in every match, every practice session, every moment." },
              { title: "Unity", description: "Our strength lies in our bond. We win together, we lose together, we grow together." },
              { title: "Innovation", description: "We constantly evolve our strategies and push the boundaries of competitive play." },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card gaming-border p-8 text-center"
              >
                <h3 className="text-2xl font-display font-bold text-primary mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TeamPage;
