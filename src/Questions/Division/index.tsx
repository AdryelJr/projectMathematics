import { useState } from "react";
import ChooseLevel from "../_ChooseLevel/1. index";
import StoryDivi from "./2. StoryDivi";
import { QuizDivi } from "./3. QuizDivi";


export const Division: React.FC = () => {
    const [level, setLevel] = useState<string | null>(null);
    const [showStory, setShowStory] = useState<boolean>(false);
    const [showQuiz, setShowQuiz] = useState<boolean>(false);

    const handleLevelSelect = (selectedLevel: string) => {
        setLevel(selectedLevel);
        setShowStory(true);
    };

    const handleStoryAdvance = () => {
        setShowStory(false);
        setShowQuiz(true);
    };

    return (
        <div className="content-addtion">
            {!level && <ChooseLevel onLevelSelect={handleLevelSelect} />}
            {showStory && level && <StoryDivi level={level} onAdvance={handleStoryAdvance} />}
            {showQuiz && level && <QuizDivi level={level} operation="division" />}
        </div>
    );
};

