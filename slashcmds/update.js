const { SlashCommandBuilder } = require("@discordjs/builders");
const { exec, execSync } = require("child_process");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("update")
        .setDescription("Update the bot."),

    async execute(interaction) {
        const valid = ["928624781731983380"];
        if (!valid.includes(interaction.member.id)) {
            interaction.reply({
                embeds: [
                    {
                        title: "Error",
                        description:
                            "You do not have permission to execute commands.",
                        color: 0xff0000,
                    },
                ],
                ephemeral: true,
            });
            return;
        }
        await interaction.deferReply();
        exec("git pull", async (error, stdout) => {
            await interaction.followUp({
                embeds: [
                    {
                        title: "Output",
                        description: `\`\`\`${
                            stdout || "Completed with no output."
                        }\`\`\`\n\nRestarting...`,
                    },
                ],
                ephemeral: false,
            });
            execSync("pm2 restart 1", async (error, stdout) => {
                return null;
            });
        });
    },
};
