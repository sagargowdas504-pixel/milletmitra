import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, ChefHat, Globe, ChevronDown, ChevronUp, Volume2, Pause, Play, SkipBack, SkipForward, StopCircle, Lightbulb, Ear, Sparkles, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { recipes, languageLabels, type Language, type Recipe } from "@/data/recipes";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const } }),
};

const SimplifiedView = ({ instructions, language }: { instructions: string[]; language: Language }) => {
  const simplified = useMemo(() => {
    return instructions.map((step) =>
      step
        .replace(/\d+\s*(cups?|tbsp|tsp|grams?|g|kg|ml|liters?|minutes?|min|hrs?|hours?)/gi, "some")
        .replace(/\d+[-–]\d+/g, "a few")
        .replace(/\d+\/\d+/g, "a little")
    );
  }, [instructions]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl p-6 border border-secondary/20">
      <h4 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
          <Lightbulb className="h-4 w-4 text-secondary" />
        </div>
        {language === "en" ? "Simple Steps" : language === "hi" ? "आसान तरीका" : language === "kn" ? "ಸರಳ ಹಂತಗಳು" : "సులభ దశలు"}
      </h4>
      <ol className="space-y-3">
        {simplified.map((step, i) => (
          <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
            <span className="flex-shrink-0 h-7 w-7 rounded-lg bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center shadow-sm">{i + 1}</span>
            <span className="pt-0.5">{step}</span>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
};

const AudioControls = ({ recipe, language }: { recipe: Recipe; language: Language }) => {
  const { isSpeaking, isPaused, currentStepIndex, speakFullRecipe, startStepByStep, nextStep, prevStep, goToStep, pause, resume, stop } = useSpeechSynthesis();
  const [mode, setMode] = useState<"idle" | "full" | "steps">("idle");
  const t = recipe.translations[language];

  const handleListenFull = () => { setMode("full"); speakFullRecipe(t.ingredients, t.instructions, language); };
  const handleStepByStep = () => { setMode("steps"); startStepByStep(t.instructions, language); };
  const handleStop = () => { stop(); setMode("idle"); };
  const isActive = isSpeaking || isPaused;

  return (
    <div className="space-y-3">
      {!isActive && (
        <div className="flex flex-wrap gap-2">
          <button onClick={handleListenFull} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-medium shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
            <Volume2 className="h-4 w-4" />
            {language === "en" ? "Listen to Recipe" : language === "hi" ? "रेसिपी सुनें" : language === "kn" ? "ರೆಸಿಪಿ ಕೇಳಿ" : "రెసిపీ వినండి"}
          </button>
          <button onClick={handleStepByStep} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/15 text-secondary-foreground text-sm font-medium border border-secondary/30 hover:bg-secondary/25 transition-all hover:scale-[1.02] active:scale-[0.98]">
            <Ear className="h-4 w-4 text-secondary" />
            {language === "en" ? "Step-by-Step" : language === "hi" ? "कदम दर कदम" : language === "kn" ? "ಹಂತ ಹಂತವಾಗಿ" : "అడుగు అడుగు"}
          </button>
        </div>
      )}

      {isActive && (
        <motion.div initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="bg-gradient-to-r from-muted to-muted/60 rounded-2xl p-4 space-y-3 border border-border/60 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {mode === "full" ? (language === "en" ? "Playing" : "▶") : `Step ${currentStepIndex + 1}/${t.instructions.length}`}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {mode === "steps" && (
                <Button size="icon" variant="ghost" onClick={prevStep} disabled={currentStepIndex <= 0} className="h-8 w-8 rounded-full hover:bg-primary/10">
                  <SkipBack className="h-3.5 w-3.5" />
                </Button>
              )}
              <button onClick={isPaused ? resume : pause} className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:shadow-lg transition-all">
                {isPaused ? <Play className="h-4 w-4 ml-0.5" /> : <Pause className="h-4 w-4" />}
              </button>
              {mode === "steps" && (
                <Button size="icon" variant="ghost" onClick={nextStep} disabled={currentStepIndex >= t.instructions.length - 1} className="h-8 w-8 rounded-full hover:bg-primary/10">
                  <SkipForward className="h-3.5 w-3.5" />
                </Button>
              )}
              <Button size="icon" variant="ghost" onClick={handleStop} className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10">
                <StopCircle className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          {mode === "steps" && (
            <div className="flex gap-1">
              {t.instructions.map((_, i) => (
                <button key={i} onClick={() => goToStep(i)} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i === currentStepIndex ? "bg-primary h-2.5" : i < currentStepIndex ? "bg-primary/40" : "bg-border"}`} />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const RecipeCard = ({ recipe, language, index }: { recipe: Recipe; language: Language; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const [showSimple, setShowSimple] = useState(false);
  const t = recipe.translations[language];
  const { currentStepIndex } = useSpeechSynthesis();

  const difficultyStyles = {
    Easy: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Medium: "bg-amber-50 text-amber-700 border border-amber-200",
    Hard: "bg-rose-50 text-rose-700 border border-rose-200",
  };

  return (
    <motion.div custom={index} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} layout className="group bg-card rounded-3xl border border-border/50 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
      {/* Image with overlay gradient */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={recipe.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">{recipe.milletType}</span>
          <span className="bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">{recipe.category}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display text-xl md:text-2xl font-bold text-white drop-shadow-lg">{t.name}</h3>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{t.description}</p>

        {/* Meta info pills */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-muted/60 rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-secondary" />{recipe.prepTime}
          </div>
          <div className="flex items-center gap-1.5 bg-muted/60 rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
            <ChefHat className="h-3.5 w-3.5 text-secondary" />{recipe.cookTime}
          </div>
          <div className="flex items-center gap-1.5 bg-muted/60 rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-secondary" />{recipe.servings}
          </div>
          <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${difficultyStyles[recipe.difficulty]}`}>{recipe.difficulty}</span>
        </div>

        {/* Audio controls */}
        <AudioControls recipe={recipe} language={language} />

        {/* Action buttons */}
        <div className="flex gap-2 pt-1">
          <button onClick={() => setExpanded(!expanded)} className="flex-1 flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/80 hover:bg-muted/60 transition-colors">
            <span>{expanded ? (language === "kn" ? "ಮರೆಮಾಡಿ" : language === "hi" ? "छिपाएं" : "Hide") : (language === "kn" ? "ಪೂರ್ಣ ರೆಸಿಪಿ" : language === "hi" ? "पूरी रेसिपी" : "Full Recipe")}</span>
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>
          <button onClick={() => setShowSimple(!showSimple)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${showSimple ? "bg-secondary/20 text-secondary-foreground" : "text-muted-foreground hover:bg-muted/60"}`}>
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline">{language === "en" ? "Simplify" : language === "hi" ? "आसान" : language === "kn" ? "ಸರಳ" : "సులభం"}</span>
          </button>
        </div>

        {/* Simplified view */}
        <AnimatePresence>
          {showSimple && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <SimplifiedView instructions={t.instructions} language={language} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full recipe details */}
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
              <div className="pt-4 space-y-6 border-t border-border/40 mt-2">
                {/* Ingredients */}
                <div className="bg-muted/30 rounded-2xl p-5">
                  <h4 className="font-display text-base font-bold text-foreground mb-3 flex items-center gap-2">
                    <UtensilsCrossed className="h-4 w-4 text-primary" />
                    {language === "en" ? "Ingredients" : language === "hi" ? "सामग्री" : language === "kn" ? "ಪದಾರ್ಥಗಳು" : "పదార్థాలు"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {t.ingredients.map((ing, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center gap-2 text-sm text-foreground/80 bg-card rounded-lg px-3 py-2 border border-border/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0" />
                        {ing}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="font-display text-base font-bold text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    {language === "en" ? "Instructions" : language === "hi" ? "विधि" : language === "kn" ? "ತಯಾರಿ ವಿಧಾನ" : "తయారీ విధానం"}
                  </h4>
                  <ol className="space-y-2">
                    {t.instructions.map((step, i) => (
                      <motion.li key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className={`flex gap-3 text-sm rounded-xl p-3 transition-all duration-300 ${currentStepIndex === i ? "bg-primary/10 border border-primary/25 shadow-sm" : "bg-muted/20 hover:bg-muted/40"}`}>
                        <span className={`flex-shrink-0 h-7 w-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${currentStepIndex === i ? "bg-primary text-primary-foreground ring-2 ring-primary/30 scale-110" : "bg-primary/80 text-primary-foreground"}`}>{i + 1}</span>
                        <span className="pt-0.5 leading-relaxed">{step}</span>
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* Pro tip */}
                <div className="bg-gradient-to-r from-secondary/10 to-accent/5 rounded-2xl p-4 border border-secondary/15">
                  <h4 className="font-display text-sm font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                    💡 {language === "en" ? "Pro Tip" : language === "hi" ? "सुझाव" : language === "kn" ? "ಸಲಹೆ" : "చిట్కా"}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.tips}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const RecipesPage = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Breakfast", "Main Course"];
  const filtered = selectedCategory === "All" ? recipes : recipes.filter((r) => r.category === selectedCategory);

  return (
    <main className="pt-24 pb-20 bg-gradient-to-b from-background via-background to-muted/30 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-secondary/15 text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-secondary/20">
            <ChefHat className="h-4 w-4 text-secondary" />
            Cook with Millets
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Millet <span className="text-primary">Recipes</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base leading-relaxed">
            Delicious, healthy recipes with audio guidance. Listen in your language — no reading required!
          </p>
        </motion.div>

        {/* Accessibility banner */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-gradient-to-r from-primary/8 to-secondary/8 border border-primary/15 rounded-2xl p-5 mb-10 flex items-start gap-4 max-w-2xl mx-auto backdrop-blur-sm">
          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Volume2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-0.5">
              {language === "en" ? "🔊 Audio Available on Every Recipe" : "🔊"}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === "en" ? "Press \"Listen to Recipe\" for full narration, or use step-by-step guided audio." : language === "hi" ? "हर रेसिपी सुनी जा सकती है। \"रेसिपी सुनें\" बटन दबाएं।" : language === "kn" ? "ಪ್ರತಿ ರೆಸಿಪಿಯನ್ನು ಕೇಳಬಹುದು. \"ರೆಸಿಪಿ ಕೇಳಿ\" ಒತ್ತಿ." : "ప్రతి రెసిపీ వినవచ్చు."}
            </p>
          </div>
        </motion.div>

        {/* Controls bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 p-4 md:p-5 mb-10 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Language selector */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Globe className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline">Language:</span>
              </div>
              <div className="flex gap-1.5 bg-muted/50 p-1 rounded-xl">
                {(Object.keys(languageLabels) as Language[]).map((lang) => (
                  <button key={lang} onClick={() => setLanguage(lang)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${language === lang ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/80"}`}>
                    {languageLabels[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div className="flex gap-1.5 bg-muted/50 p-1 rounded-xl">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${selectedCategory === cat ? "bg-secondary text-secondary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/80"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filtered.map((recipe, i) => (
            <RecipeCard key={recipe.id} recipe={recipe} language={language} index={i} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <ChefHat className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No recipes found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default RecipesPage;
