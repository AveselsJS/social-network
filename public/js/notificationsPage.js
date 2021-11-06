$(document).ready(() => {
    $.get("/api/notifications", (data) => {
        outputNotificationList(data, $(".resultsContainer"))
    })
})

function outputNotificationList(notifications, container) {
    notifications.forEach(notification => {
        const html = createNotificationHtml(notification)
        container.append(html)
    })

    if (notifications.length == 0) {
        container.append("<span class='NoResults'>У вас нет никаких уведомлений</span>")
    }
}

function createNotificationHtml(notification) {
    const userFrom = notification.userFrom;
    const text = getNotificationText(notification)
    const href = getNotificationUrl(notification)
    const className = notification.opened ? "" : "active"

    return `<a href='${href}' class='resultListItem notification ${className}'>
                <div class='resultsImageContainer'>
                    <img src='${userFrom.profilePic}'>
                </div>
                <div class='resultsDetailsContainer ellipsis'>
                    <span ckass='ellipsis'>${text}</span>
                </div>
            <a/>`
}

function getNotificationText(notification) {

    const userFrom = notification.userFrom
    if (!userFrom.firstName || !userFrom.lastName) {
        return alert("Пользователь не был запопулейтен")
    }

    const userFromName = `${userFrom.firstName} ${userFrom.lastName}`;
    let text

    if (notification.notificationType == "retweet") {
        text = `${userFromName} ретвитнул один из Ваших постов` 
    } else if (notification.notificationType == "like") {
        text = `${userFromName} понравился один из Ваших постов` 
    } else if (notification.notificationType == "reply") {
        text = `${userFromName} репостнул один из Ваших постов` 
    } else if (notification.notificationType == "follow") {
        text = `${userFromName} подписался на Вас` 
    }

    return `<span class='ellipsis'>${text}</span>`
}

function getNotificationUrl(notification) {
    let url

    if (notification.notificationType == "retweet" || 
    notification.notificationType == "like" || 
    notification.notificationType == "reply") {
        url = `/posts/${notification.entityId}` 
    } else if (notification.notificationType == "follow") {
        url = `/profile/${notification.entityId}`  
    }

    return url
}