import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function QuestionCard({type, question}) {

    const options = [
        "A.Test 1",
        "B.Test 2",
        "C.Test 3",
        "D.Test 4",
    ]

  return (
    <div className="question-card">
        <p>Question 1 (Multiple Choice • Single Answer)</p>
        <h3>How many sides does a triangle have?</h3>

        <div>
            <ToggleGroup type="single">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    1
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    2
                </ToggleGroupItem>
                <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
                    3
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    </div>
  );
}