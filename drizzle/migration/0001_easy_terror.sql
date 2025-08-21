CREATE TABLE `verification_tokens` (
	`token` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `verification_tokens_token` PRIMARY KEY(`token`)
);
--> statement-breakpoint
ALTER TABLE `password-reset` RENAME COLUMN `user_id` TO `email`;--> statement-breakpoint
ALTER TABLE `password-reset` RENAME COLUMN `token` TO `otp`;--> statement-breakpoint
ALTER TABLE `password-reset` DROP FOREIGN KEY `password-reset_user_id_register_id_fk`;
--> statement-breakpoint
ALTER TABLE `password-reset` MODIFY COLUMN `email` varchar(255) NOT NULL;