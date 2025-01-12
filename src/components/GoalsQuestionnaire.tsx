import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from '@/lib/supabase';
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

interface GoalsQuestionnaireProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function GoalsQuestionnaire({ open, onOpenChange }: GoalsQuestionnaireProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        fitness_goal: '',
        weekly_workout_days: 3,
        preferred_workout_time: '',
        fitness_level: '',
        health_conditions: [] as string[],
        target_weight: '',
        dietary_preferences: [] as string[],
    });

    const goals = [
        { id: 'weight_loss', label: 'Gewichtsverlust', description: 'Reduziere Körperfett und erreiche dein Wunschgewicht' },
        { id: 'muscle_gain', label: 'Muskelaufbau', description: 'Baue Muskelmasse auf und werde stärker' },
        { id: 'endurance', label: 'Ausdauer verbessern', description: 'Verbessere deine Kondition und Ausdauer' },
        { id: 'flexibility', label: 'Flexibilität verbessern', description: 'Werde beweglicher und verbessere deine Mobilität' },
        { id: 'general_fitness', label: 'Allgemeine Fitness', description: 'Verbessere deine allgemeine Gesundheit und Fitness' },
    ];

    const workoutTimes = [
        { id: 'morning', label: 'Morgens', icon: '🌅', description: '6:00 - 11:00 Uhr' },
        { id: 'afternoon', label: 'Nachmittags', icon: '☀️', description: '11:00 - 17:00 Uhr' },
        { id: 'evening', label: 'Abends', icon: '🌙', description: '17:00 - 22:00 Uhr' },
        { id: 'flexible', label: 'Flexibel', icon: '⭐', description: 'Keine feste Zeit' },
    ];

    const fitnessLevels = [
        { id: 'beginner', label: 'Anfänger', description: 'Neu im Fitness oder lange Pause' },
        { id: 'intermediate', label: 'Fortgeschritten', description: 'Regelmäßiges Training' },
        { id: 'advanced', label: 'Sehr Fortgeschritten', description: 'Erfahrener Athlet' },
    ];

    const steps = [
        {
            title: "Was ist dein Hauptziel?",
            subtitle: "Wähle das Ziel, das am besten zu dir passt",
            component: (
                <div className="grid gap-4">
                    {goals.map((goal) => (
                        <Card
                            key={goal.id}
                            className={`cursor-pointer transition-all ${
                                formData.fitness_goal === goal.id
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'hover:border-primary/50'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, fitness_goal: goal.id }))}
                        >
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">{goal.label}</h3>
                                    <p className="text-sm text-gray-500">{goal.description}</p>
                                </div>
                                {formData.fitness_goal === goal.id && (
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )
        },
        {
            title: "Wie oft möchtest du trainieren?",
            subtitle: "Wähle die Anzahl der Trainingstage pro Woche",
            component: (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[2, 3, 4, 5].map(day => (
                        <Card
                            key={day}
                            className={`cursor-pointer transition-all ${
                                formData.weekly_workout_days === day
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'hover:border-primary/50'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, weekly_workout_days: day }))}
                        >
                            <CardContent className="p-4 text-center">
                                <div className="text-3xl font-bold mb-1">{day}</div>
                                <div className="text-sm text-gray-500">Tage</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )
        },
        {
            title: "Wann trainierst du am liebsten?",
            subtitle: "Wähle deine bevorzugte Trainingszeit",
            component: (
                <div className="grid gap-4">
                    {workoutTimes.map((time) => (
                        <Card
                            key={time.id}
                            className={`cursor-pointer transition-all ${
                                formData.preferred_workout_time === time.id
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'hover:border-primary/50'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, preferred_workout_time: time.id }))}
                        >
                            <CardContent className="p-4 flex items-center space-x-4">
                                <div className="text-2xl">{time.icon}</div>
                                <div>
                                    <h3 className="font-semibold">{time.label}</h3>
                                    <p className="text-sm text-gray-500">{time.description}</p>
                                </div>
                                {formData.preferred_workout_time === time.id && (
                                    <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )
        },
        {
            title: "Wie schätzt du dein Fitnesslevel ein?",
            subtitle: "Wähle das Level, das am besten zu dir passt",
            component: (
                <div className="grid gap-4">
                    {fitnessLevels.map((level) => (
                        <Card
                            key={level.id}
                            className={`cursor-pointer transition-all ${
                                formData.fitness_level === level.id
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'hover:border-primary/50'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, fitness_level: level.id }))}
                        >
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold">{level.label}</h3>
                                    <p className="text-sm text-gray-500">{level.description}</p>
                                </div>
                                {formData.fitness_level === level.id && (
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )
        },
        {
            title: "Hast du gesundheitliche Einschränkungen?",
            subtitle: "Wähle alle zutreffenden Optionen",
            component: (
                <div className="space-y-4">
                    {[
                        { id: 'back_pain', label: 'Rückenschmerzen', description: 'Chronische oder akute Rückenschmerzen' },
                        { id: 'joint_issues', label: 'Gelenkprobleme', description: 'Probleme mit Knien, Hüften oder anderen Gelenken' },
                        { id: 'heart_condition', label: 'Herzprobleme', description: 'Herz-Kreislauf-Erkrankungen' },
                        { id: 'diabetes', label: 'Diabetes', description: 'Typ 1 oder Typ 2 Diabetes' },
                        { id: 'asthma', label: 'Asthma', description: 'Asthma oder andere Atemwegserkrankungen' }
                    ].map(condition => (
                        <Card key={condition.id} className="hover:border-primary/50">
                            <CardContent className="p-4 flex items-start space-x-4">
                                <Checkbox
                                    id={condition.id}
                                    checked={formData.health_conditions.includes(condition.id)}
                                    onCheckedChange={(checked) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            health_conditions: checked
                                                ? [...prev.health_conditions, condition.id]
                                                : prev.health_conditions.filter(id => id !== condition.id)
                                        }));
                                    }}
                                />
                                <div>
                                    <label htmlFor={condition.id} className="font-semibold cursor-pointer">
                                        {condition.label}
                                    </label>
                                    <p className="text-sm text-gray-500">{condition.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )
        },
        {
            title: "Was ist dein Zielgewicht?",
            subtitle: "Optional - Gib dein Zielgewicht in kg ein",
            component: (
                <Card>
                    <CardContent className="p-4">
                        <Input
                            type="number"
                            placeholder="Zielgewicht in kg"
                            value={formData.target_weight}
                            onChange={(e) => 
                                setFormData(prev => ({ ...prev, target_weight: e.target.value }))
                            }
                            className="text-lg"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            Lass dieses Feld leer, wenn du kein spezifisches Zielgewicht hast
                        </p>
                    </CardContent>
                </Card>
            )
        },
        {
            title: "Ernährungsvorlieben?",
            subtitle: "Wähle alle zutreffenden Optionen",
            component: (
                <div className="space-y-4">
                    {[
                        { id: 'vegetarian', label: 'Vegetarisch', description: 'Keine Fleischprodukte' },
                        { id: 'vegan', label: 'Vegan', description: 'Keine tierischen Produkte' },
                        { id: 'gluten_free', label: 'Glutenfrei', description: 'Keine glutenhaltigen Produkte' },
                        { id: 'lactose_free', label: 'Laktosefrei', description: 'Keine Milchprodukte' },
                        { id: 'low_carb', label: 'Low Carb', description: 'Reduzierte Kohlenhydrate' }
                    ].map(pref => (
                        <Card key={pref.id} className="hover:border-primary/50">
                            <CardContent className="p-4 flex items-start space-x-4">
                                <Checkbox
                                    id={pref.id}
                                    checked={formData.dietary_preferences.includes(pref.id)}
                                    onCheckedChange={(checked) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            dietary_preferences: checked
                                                ? [...prev.dietary_preferences, pref.id]
                                                : prev.dietary_preferences.filter(id => id !== pref.id)
                                        }));
                                    }}
                                />
                                <div>
                                    <label htmlFor={pref.id} className="font-semibold cursor-pointer">
                                        {pref.label}
                                    </label>
                                    <p className="text-sm text-gray-500">{pref.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )
        }
    ];

    const handleNext = async () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                const { error } = await supabase
                    .from('profiles')
                    .update(formData)
                    .eq('id', user.id);

                if (error) throw error;
                onOpenChange(false);
            } catch (error) {
                console.error('Error saving goals:', error);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl p-0 gap-0 bg-white">
                <DialogTitle className="sr-only">
                    {steps[currentStep].title}
                </DialogTitle>
                <div className="bg-gradient-to-br from-[#92A3FD] to-[#9DCEFF] p-6 text-white rounded-t-lg">
                    <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
                    <p className="text-white/80">{steps[currentStep].subtitle}</p>
                </div>

                <div className="p-6">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {steps[currentStep].component}
                    </motion.div>
                </div>

                <div className="p-4 bg-gray-50 border-t flex justify-between items-center rounded-b-lg">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Zurück
                    </Button>

                    <div className="flex items-center gap-2">
                        {steps.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentStep
                                        ? 'bg-primary w-4'
                                        : index < currentStep
                                        ? 'bg-primary/50'
                                        : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>

                    <Button onClick={handleNext} className="gap-2">
                        {currentStep === steps.length - 1 ? 'Fertig' : 'Weiter'}
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
