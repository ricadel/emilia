module.exports = {
    enabled: true,
    trigger: "clear",
    callback: message => {
        if (message.content.indexOf('!clear') > -1){
            const arggs = message.content.split(' ').slice(1);
        const amount = arggs.join(' ');
        if (!amount) return message.channel.send('Вы не указали, сколько сообщений нужно удалить!');
        if (isNaN(amount)) return message.channel.send('Это не число!');
        
        if (amount > 100) return message.channel.send('Вы не можете удалить 100 сообщений за раз');
        if (amount < 1) return message.channel.send('Вы должны ввести число больше чем 1');
        
        async function delete_messages() {
        
            await message.channel.messages.fetch({
                limit: amount
            }).then(messages => {
                message.channel.bulkDelete(messages)
                message.channel.send(`Удалено ${amount} сообщений!`)
            })
          };
          delete_messages();
        }
    }
}
