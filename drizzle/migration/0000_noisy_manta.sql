CREATE TABLE `register` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role` varchar(20) NOT NULL DEFAULT 'user',
	CONSTRAINT `register_id` PRIMARY KEY(`id`),
	CONSTRAINT `register_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `password-reset` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`token` varchar(6) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `password-reset_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `password-reset` ADD CONSTRAINT `password-reset_user_id_register_id_fk` FOREIGN KEY (`user_id`) REFERENCES `register`(`id`) ON DELETE no action ON UPDATE no action;