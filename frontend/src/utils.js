import { surpriseMePrompts } from './prompts';

export function getRandomPrompt(oldPrompt) {
  const random = Math.floor(Math.random() * surpriseMePrompts.length);
  const newPrompt = surpriseMePrompts[random];
  if (newPrompt === oldPrompt) return getRandomPrompt();
  return newPrompt;
}
