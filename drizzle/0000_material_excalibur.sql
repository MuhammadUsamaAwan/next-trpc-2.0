CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`task` text NOT NULL,
	`is_completed` integer DEFAULT false NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
