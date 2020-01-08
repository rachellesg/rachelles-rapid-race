# Rachelle's Rapid Race

## Post Mortem Documentation

Post mortems are important to understand about what happened in a project and actively think about what you learned.

Post-mortems are meant to be a blame-less space open to objective conversation about what went well and what could be improved.

Even in the examples below, where tens of millions of dollars could be lost, the best approach is to think through the series of events that led to the outcome.

Large mistakes are almost never the fault of the developer, but of the systems and processes in place to prevent errors and problems.

## Approach and Process

### What in my process and approach to this project would I do differently next time?

Try and adopt the KISS methods to coding. Get better at cleaning up and refactoring code.

### What in my process and approach to this project went well that I would repeat next time?

Sourcing for game assets went well. Pulled off game concept well too. Creating base functionality and slowly adding on extra features once foundation is secured. Also committing to Github often.

## Code and Code Design

### What in my code and program design in the project would I do differently next time?

Variable naming was ok but could probably do better.

### What in my code and program design in the project went well? Is there anything I would do the same next time?

For each, please include code examples.

### Code snippet up to 20 lines.

This went pretty well as I initially had multiple duplicating functions performing the exact same thing. Refactored it on Akira's recommendation and shortened it to one function for all 3 modes.

> function showWord (words,phrases,css) {
>    if (stage < 4) {
>        var maxWords = selectedMode.easy.length; // ALL of the objects in word.easy array
>        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
>        currentWord.textContent = selectedMode.easy[wordIndex];
>    } else if (stage >= 4 && stage < 12) {
>        var maxWords = selectedMode.medium.length; // ALL of the objects in word.medium array
>        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
>        currentWord.textContent = selectedMode.medium[wordIndex];
>    } else if (stage >= 12 && stage < 20) {
>        var maxWords = selectedMode.hard.length; // ALL of the objects in word.hard array
>        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
>        currentWord.textContent = selectedMode.hard[wordIndex];
>    } else if (stage >= 20) {
>        var maxWords = selectedMode.superhard.length; // ALL of the objects in word.superhard array
>        var wordIndex = Math.floor(Math.random() * (maxWords - 0)); // random int
>        currentWord.textContent = selectedMode.superhard[wordIndex];
>    }
>}

### Code design documents or architecture drawings / diagrams.

Initial Figma Design

![Initial Figma Design](https://i.imgur.com/RSRIroD.png "Initial Figma Design")
![Game Logic pseudo code](https://i.imgur.com/TzUbLfe.png "Game Logic")


## WDI Unit 1 Post Mortem

### What habits did I use during this unit that helped me?

Committing often so it was easy to trace back my code. Knowing when to STOP (and take breaks) before I break myself and/or my game. Always ask questions when in doubt. I learned that when I ask someone questions I may accidentally get an eureka moment. (Happened before)

### What habits did I have during this unit that I can improve on?

I did a bit of user testing and probably should have done MORE. Writing better, simpler, reusable code.


### How is the overall level of the course during this unit? (instruction, course materials, etc.)

8 outta 10