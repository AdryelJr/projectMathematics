import { useState } from "react";
import ChooseLevel from "../_ChooseLevel/1. index";
import Story from "./2. StoryAdd";
import { Quiz } from "./3. Quiz";

export const Addition: React.FC = () => {
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
            {showStory && level && <Story level={level} onAdvance={handleStoryAdvance} />}
            {showQuiz && level && <Quiz level={level} operation="addition" />}
        </div>
    );
};
