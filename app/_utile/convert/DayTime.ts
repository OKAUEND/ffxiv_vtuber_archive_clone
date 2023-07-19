export default function (time: string | Date) {
  const date = new Date(time);
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月${date.getDate()}日`;
}
